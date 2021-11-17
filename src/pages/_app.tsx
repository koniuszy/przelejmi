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
      html: {
        overflow: 'hidden',
      },
      '.nextImgBox': {
        borderRadius: 15,
        mr: '100',
        position: 'relative',
        overflow: 'hidden',
        height: 'fit-content',
      },
      '.nextImgBox > div': {
        display: 'block !important',
      },
      '.nextImgPlaceholder': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        filter: 'blur(2rem)',
        transform: 'scale(1.1)',
      },
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
            <Flex
              px={20}
              overflowY="scroll"
              overflowX="hidden"
              height="100vh"
              flexDir="column"
              justifyContent="space-between"
            >
              <Box>
                <Header />
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
