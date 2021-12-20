import { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Center, Spinner } from '@chakra-ui/react'

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import { Auth0Provider } from '@auth0/auth0-react'

import { AUTH } from 'src/constants'
import { getToken, useSession } from 'src/lib/auth'

import FadeInAnimation from '../FadeInAnimation'

const AppProviders: FC = ({ children }) => {
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

const HasuraGqlProvider: FC = ({ children }) => {
  const [client] = useState(() => {
    const adminHeaders =
      process.env.NODE_ENV === 'development'
        ? { 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_TOKEN }
        : {}

    return new ApolloClient({
      defaultOptions: { query: { errorPolicy: 'all' } },
      link: new HttpLink({
        uri: 'https://przelejemi.hasura.app/v1/graphql',
        headers: {
          ...adminHeaders,
          Authorization: `Bearer ${getToken()}`,
          'content-type': 'application/json',
        },
      }),
      cache: new InMemoryCache(),
    })
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const OwnSessionProvider: FC = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated, isLoading, saveToken, login } = useSession()
  const [, setIsSavingToken] = useState(false)

  function handleSaveToken() {
    setIsSavingToken(true)
    saveToken().then(() => setIsSavingToken(false))
  }

  const isHomePage = router.pathname === '/'

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isHomePage) login()
    if (isAuthenticated) handleSaveToken()
  }, [isAuthenticated, router.pathname, isLoading])

  if (isHomePage) return <FadeInAnimation>{children}</FadeInAnimation>

  if (!getToken() || !isAuthenticated)
    return (
      <Center mt={10}>
        <Spinner />
      </Center>
    )

  return (
    <HasuraGqlProvider>
      <FadeInAnimation>{children}</FadeInAnimation>
    </HasuraGqlProvider>
  )
}

export default AppProviders
