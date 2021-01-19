import { ApolloProvider } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'

import Header from 'src/components/Header'

const extendedTheme = extendTheme({})

const client = new ApolloClient({
  uri: `/api/graphql`,
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={extendedTheme}>
        <Header />
        <Box px="40" py="10">
          <Component customProp="s" {...pageProps} />
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
