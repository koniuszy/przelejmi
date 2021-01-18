import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import Header from 'components/Header'

const extendedTheme = extendTheme({})

function MyApp({ Component, pageProps }) {
  return (
      <ChakraProvider theme={extendedTheme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
  )
}

export default MyApp
