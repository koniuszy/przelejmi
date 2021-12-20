import { FC, useEffect } from 'react'

import { useRouter } from 'next/router'

import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'

export const SessionProvider: FC = ({ children }) => {
  if (!process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID)
    throw new Error('missing process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID')

  return (
    <Auth0Provider
      domain="dev-h4l3tn-y.us.auth0.com"
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.VERCEL_URL || 'http://localhost:3000'}
      audience="https://dev-h4l3tn-y.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <OwnSessionProvider>{children}</OwnSessionProvider>
    </Auth0Provider>
  )
}

const OwnSessionProvider: FC = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated, isLoading, loginWithRedirect, user, getAccessTokenSilently } = useAuth0()

  if (isAuthenticated) {
    getAccessTokenSilently({ audience: 'https://dev-h4l3tn-y.us.auth0.com/api/v2/' }).then(
      console.log
    )
    console.log(user)
  }

  useEffect(() => {
    if (isLoading || router.pathname === '/') return
    if (!isAuthenticated) loginWithRedirect()
  }, [isAuthenticated, isLoading])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
