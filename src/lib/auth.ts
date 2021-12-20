import { useRouter } from 'next/router'

import { useAuth0 } from '@auth0/auth0-react'

import { AUTH } from 'src/constants'

const TOKEN_STORAGE_KEY = 'hasura/token'

export function getToken() {
  if (typeof sessionStorage === 'undefined') return null
  return sessionStorage.getItem(TOKEN_STORAGE_KEY)
}

function setToken(token: string | null) {
  if (!token) {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY)
    return
  }

  sessionStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export function useSession() {
  const { isLoading, logout, user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0()

  const router = useRouter()

  return {
    user,
    isLoading,
    isAuthenticated,
    token: getToken(),
    login() {
      loginWithRedirect({ redirectUri: router.asPath })
    },
    async saveToken() {
      const token = await getAccessTokenSilently()
      setToken(token)
    },
    logOut() {
      setToken(null)
      logout({ returnTo: AUTH.redirectUri })
    },
  }
}
