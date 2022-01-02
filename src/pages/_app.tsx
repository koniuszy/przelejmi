import { ChakraProvider, extendTheme, Box, Flex, useToast } from '@chakra-ui/react'

import { UserProvider } from '@auth0/nextjs-auth0'
import NextProgressBar from 'nextjs-progressbar'

import AppProviders from 'src/App/AppProviders'
import ErrorBoundary from 'src/App/ErrorBoundary'
import Footer from 'src/App/Footer'
import Header from 'src/App/Header'
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

      <UserProvider>
        <ChakraProvider theme={extendedTheme}>
          <Flex px={20} w="100vw" height="100vh" flexDir="column" justifyContent="space-between">
            <Header />
            <Box overflowY="scroll" overflowX="hidden" mb="auto" w="100%">
              <AppProviders>
                <main>
                  <Component {...pageProps} />
                </main>
              </AppProviders>
            </Box>
            <Footer />
          </Flex>
        </ChakraProvider>
      </UserProvider>
    </ErrorBoundary>
  )
}

export default MyApp
