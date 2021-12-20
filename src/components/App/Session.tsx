import { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Center, Spinner } from '@chakra-ui/react'

import { Auth0Provider } from '@auth0/auth0-react'
import { motion } from 'framer-motion'

import { AUTH } from 'src/constants'
import { getToken, useSession } from 'src/lib/auth'

export const SessionProvider: FC = ({ children }) => {
  if (!process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID)
    throw new Error('missing process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID')

  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={AUTH.redirectUri}
      domain={AUTH.domain}
      audience={AUTH.audience}
      scope="read:current_user update:current_user_metadata"
    >
      <OwnSessionProvider>{children}</OwnSessionProvider>
    </Auth0Provider>
  )
}

const OwnSessionProvider: FC = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated, isLoading, login, decodeToken } = useSession()
  const [, setIsDecoding] = useState(false)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setIsDecoding(true)
      decodeToken().then(() => setIsDecoding(false))
    }

    if (isLoading || router.pathname === '/') return
    if (!isAuthenticated) login()
  }, [isAuthenticated, isLoading])

  if (!getToken() && router.pathname !== '/')
    return (
      <Center mt={10}>
        <Spinner />
      </Center>
    )

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
