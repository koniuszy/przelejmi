import { FC, useEffect, useRef, useState } from 'react'

import Router, { useRouter } from 'next/router'

import { Center, Spinner } from '@chakra-ui/react'

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { useAuth } from 'src/hooks/auth'

import FadeInAnimation from '../components/FadeInAnimation'

const adminHeaders = process.env.HASURA_ADMIN_TOKEN
  ? { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_TOKEN }
  : {}

function createApolloClient(token: string) {
  const cache = new InMemoryCache()
  const httpLink = new HttpLink({
    uri: process.env.GQL_API_ENDPOINT,
    headers: {
      ...adminHeaders,
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        if (extensions?.code === 'invalid-jwt') Router.push('/api/auth/login')
      })

    if (networkError) console.error(networkError)
  })

  return new ApolloClient({
    defaultOptions: { query: { errorPolicy: 'all' } },
    link: from([httpLink, errorLink]),
    cache,
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
