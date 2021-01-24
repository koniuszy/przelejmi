import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import Header from 'src/components/Header'

const extendedTheme = extendTheme({
  styles: {
    global: {
      '.imgBox': {
        borderRadius: 15,
      },
      '.imgBox > div': {
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
      <ApolloProvider client={client}>
        <ChakraProvider theme={extendedTheme}>
          <Header />
          <Box px="40" py="10">
            <Component customProp="s" {...pageProps} />
          </Box>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
