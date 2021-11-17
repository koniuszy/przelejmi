import { useContext } from 'react'

import { signOut, signIn } from 'next-auth/client'

import { sessionContext } from 'src/components/App/Session'

function useSession() {
  const [session, isLoading] = useContext(sessionContext)
  return { user: session?.user, isLoading, signOut, signIn }
}

export default useSession
