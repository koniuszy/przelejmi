import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

import Header from 'components/Header'

const extendedTheme = extendTheme({})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={extendedTheme}>
      <Header />
      <Box px="40" py="10">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
