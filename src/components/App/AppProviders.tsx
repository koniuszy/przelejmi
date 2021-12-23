import { FC, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { Center, Spinner } from '@chakra-ui/react'

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'

import { useAuth } from 'src/hooks/auth'

import FadeInAnimation from '../FadeInAnimation'

const adminHeaders = process.env.HASURA_ADMIN_TOKEN
  ? { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_TOKEN }
  : {}

const GQL_API_ENDPOINT = process.env.GQL_API_ENDPOINT || 'https://przelejemi.hasura.app/v1/graphql'

function createApolloClient(token: string) {
  return new ApolloClient({
    defaultOptions: { query: { errorPolicy: 'all' } },
    link: new HttpLink({
      uri: GQL_API_ENDPOINT,
      headers: {
        ...adminHeaders,
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    }),
    cache: new InMemoryCache(),
  })
}

const HasuraGqlProvider: FC<{ token: string }> = ({ children, token }) => {
  const prevTokenRef = useRef<null | string>(null)
  const [client, setClient] = useState(() => createApolloClient(token))

  useEffect(() => {
    if (prevTokenRef.current) setClient(createApolloClient(token))
    prevTokenRef.current = token
  }, [token])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const AppProviders: FC = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated, login, isLoading, token } = useAuth()

  const isHomePage = router.pathname === '/'

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isHomePage) login()
  }, [isAuthenticated, router.pathname, isLoading])

  if (isHomePage) return <FadeInAnimation>{children}</FadeInAnimation>

  if (!token || !isAuthenticated)
    return (
      <Center mt={10}>
        <Spinner />
      </Center>
    )

  return (
    <HasuraGqlProvider token={token}>
      <FadeInAnimation>{children}</FadeInAnimation>
    </HasuraGqlProvider>
  )
}

export default AppProviders
