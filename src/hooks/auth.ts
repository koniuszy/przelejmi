import { useRouter } from 'next/router'

import { useUser } from '@auth0/nextjs-auth0'

export function useAuth() {
  const router = useRouter()

  // fetches api/auth/me
  const { isLoading, user } = useUser()

  const token = user?.token

  return {
    isLoading,
    token: token as string | null,
    isAuthenticated: Boolean(token),
    login() {
      router.push('/api/auth/login')
    },
    logOut() {
      router.push('/api/auth/logout')
    },
  }
}
