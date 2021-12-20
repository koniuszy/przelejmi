import { useAuth0 } from '@auth0/auth0-react'

function useSession() {
  const { isLoading, loginWithPopup, logout, user } = useAuth0()
  return {
    user,
    isLoading,
    signOut() {
      logout({ returnTo: `${process.env.VERCEL_URL || 'http://localhost:3000'}/` })
    },
    signIn() {
      loginWithPopup()
    },
  }
}

export default useSession
