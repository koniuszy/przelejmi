import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from 'theme'

import Header from 'components/Header'

const extendedTheme = extendTheme(theme)

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={extendedTheme}>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
