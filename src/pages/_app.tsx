import React, { FC, useState } from 'react'

import { ChakraProvider, extendTheme, Box, Flex, useToast } from '@chakra-ui/react'

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import NextProgressBar from 'nextjs-progressbar'

import ErrorBoundary from 'src/components/App/ErrorBoundary'
import Footer from 'src/components/App/Footer'
import Header from 'src/components/App/Header'
import { SessionProvider } from 'src/components/App/Session'
import { getToken, useSession } from 'src/lib/auth'
import { errorToastContent } from 'src/lib/toastContent'

const extendedTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  styles: {
    global: {
      html: {},
      body: { overflow: 'hidden' },
    },
  },
})

const HasuraGqlProvider: FC = ({ children }) => {
  const { token } = useSession()
  const [client] = useState(() => {
    const adminHeaders =
      process.env.NODE_ENV === 'development'
        ? { 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_TOKEN }
        : {}
    if (!token && process.env.NODE_ENV === 'production') return null

    return new ApolloClient({
      defaultOptions: { query: { errorPolicy: 'all' } },
      link: new HttpLink({
        uri: 'https://przelejemi.hasura.app/v1/graphql',
        headers: {
          ...adminHeaders,
          Authorization: `Bearer ${getToken()}`,
          'content-type': 'application/json',
        },
      }),
      cache: new InMemoryCache(),
    })
  })

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!client) return <>{client}</>

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

function MyApp({ Component, pageProps: { ...pageProps } }) {
  const toast = useToast()

  return (
    <ErrorBoundary onError={(errorMessage) => toast({ ...errorToastContent, title: errorMessage })}>
      <NextProgressBar
        color={extendedTheme.colors.teal[300]}
        startPosition={0.3}
        stopDelayMs={0.2}
        height={3}
      />

      <ChakraProvider theme={extendedTheme}>
        <Flex px={20} w="100vw" height="100vh" flexDir="column" justifyContent="space-between">
          <Header />
          <Box overflowY="scroll" overflowX="hidden" mb="auto" w="100%">
            <SessionProvider>
              <HasuraGqlProvider>
                <Component {...pageProps} />
              </HasuraGqlProvider>
            </SessionProvider>
          </Box>
          <Footer />
        </Flex>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default MyApp
