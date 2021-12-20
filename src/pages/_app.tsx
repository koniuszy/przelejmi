import { ChakraProvider, extendTheme, Box, Flex, useToast } from '@chakra-ui/react'

import NextProgressBar from 'nextjs-progressbar'

import AppProviders from 'src/components/App/AppProviders'
import ErrorBoundary from 'src/components/App/ErrorBoundary'
import Footer from 'src/components/App/Footer'
import Header from 'src/components/App/Header'
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
            <AppProviders>
              <Component {...pageProps} />
            </AppProviders>
          </Box>
          <Footer />
        </Flex>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default MyApp
