import { useAuth0 } from '@auth0/auth0-react'

import { AUTH } from 'src/constants'

let tokenInMemory: string | null = null

export function getToken() {
  return tokenInMemory
}

export function useSession() {
  const { isLoading, logout, user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0()

  return {
    user,
    isLoading,
    isAuthenticated,
    token: tokenInMemory,
    login: loginWithRedirect,
    async decodeToken() {
      const token = await getAccessTokenSilently()
      tokenInMemory = token
    },
    logOut() {
      tokenInMemory = null
      logout({ returnTo: AUTH.redirectUri })
    },
  }
}
