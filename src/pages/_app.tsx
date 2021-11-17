import React from 'react'

import { ChakraProvider, extendTheme, Box, Flex, useToast } from '@chakra-ui/react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import NextProgressBar from 'nextjs-progressbar'

import ErrorBoundary from 'src/components/App/ErrorBoundary'
import Footer from 'src/components/App/Footer'
import Header from 'src/components/App/Header'
import { SessionProvider } from 'src/components/App/Session'
import { errorToastContent } from 'src/lib/toastContent'

const extendedTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  styles: {
    global: {
      html: {},
      body: {},
    },
  },
})

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: 'cache-first', errorPolicy: 'all' } },
})

function MyApp({ Component, pageProps }) {
  const toast = useToast()

  return (
    <ErrorBoundary onError={(errorMessage) => toast({ ...errorToastContent, title: errorMessage })}>
      <NextProgressBar
        color={extendedTheme.colors.teal[300]}
        startPosition={0.3}
        stopDelayMs={0.2}
        height={3}
      />

      <SessionProvider>
        <ApolloProvider client={client}>
          <ChakraProvider theme={extendedTheme}>
            <Flex px={20} w="100vw" height="100vh" flexDir="column" justifyContent="space-between">
              <Header />
              <Box overflowY="scroll" overflowX="hidden" mb="auto" w="100%">
                <Component {...pageProps} />
              </Box>
              <Footer />
            </Flex>
          </ChakraProvider>
        </ApolloProvider>
      </SessionProvider>
    </ErrorBoundary>
  )
}

export default MyApp
