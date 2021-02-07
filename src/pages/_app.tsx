import Head from 'next/head'

import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Provider } from 'next-auth/client'
import NextProgressBar from 'nextjs-progressbar'

import Header from 'src/components/Header'

const extendedTheme = extendTheme({
  styles: {
    global: {
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
  uri: `/api/graphql`,
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextProgressBar
        color={extendedTheme.colors.teal[300]}
        startPosition={0.3}
        stopDelayMs={0.2}
        height={3}
      />

      <Provider session={pageProps.session}>
        <ApolloProvider client={client}>
          <ChakraProvider theme={extendedTheme}>
            <Header />
            <Box px="40" py="10">
              <Component {...pageProps} />
            </Box>
          </ChakraProvider>
        </ApolloProvider>
      </Provider>
    </>
  )
}

export default MyApp
