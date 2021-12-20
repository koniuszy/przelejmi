import { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Center, Spinner } from '@chakra-ui/react'

import { Auth0Provider } from '@auth0/auth0-react'

import { AUTH } from 'src/constants'
import { getToken, useSession } from 'src/lib/auth'

import FadeInAnimation from '../FadeInAnimation'

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
  const { isAuthenticated, isLoading, decodeToken, login } = useSession()
  const [, setIsDecoding] = useState(false)

  function handleDecodeToken() {
    setIsDecoding(true)
    decodeToken().then(() => setIsDecoding(false))
  }

  useEffect(() => {
    if (!isAuthenticated && !isLoading && router.pathname !== '/') login()
    if (isAuthenticated) handleDecodeToken()
  }, [isAuthenticated, router.pathname, isLoading])

  if ((!getToken() || !isAuthenticated) && router.pathname !== '/')
    return (
      <Center mt={10}>
        <Spinner />
      </Center>
    )

  return <FadeInAnimation>{children}</FadeInAnimation>
}
