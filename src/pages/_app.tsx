import React, { useEffect, createContext } from 'react'

import { useRouter } from 'next/router'

import { ChakraProvider, extendTheme, Box, Flex } from '@chakra-ui/react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Session } from 'next-auth'
import { useSession, signIn } from 'next-auth/client'
import NextProgressBar from 'nextjs-progressbar'

import { Footer, Header } from 'src/components/App'

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
  uri: `/api/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: 'network-only' } },
})

export const sessionContext = createContext<[Session, boolean]>([undefined, true])

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()

  const [session, isSessionLoading] = useSession()

  // useEffect(() => {
  //   if (session && !session.user && pathname !== '/') signIn('google')
  // }, [session?.user])

  return (
    <>
      <NextProgressBar
        color={extendedTheme.colors.teal[300]}
        startPosition={0.3}
        stopDelayMs={0.2}
        height={3}
      />

      <sessionContext.Provider value={[session, isSessionLoading]}>
        <ApolloProvider client={client}>
          <ChakraProvider theme={extendedTheme}>
            <Flex
              px={20}
              overflow="scroll"
              height="100vh"
              flexDir="column"
              justifyContent="space-between"
            >
              <Box>
                <Header session={session} />
                <Component {...pageProps} />
              </Box>

              <Footer />
            </Flex>
          </ChakraProvider>
        </ApolloProvider>
      </sessionContext.Provider>
    </>
  )
}

export default MyApp
