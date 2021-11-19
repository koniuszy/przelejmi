import { useContext } from 'react'

import { signOut, signIn } from 'next-auth/react'

import { sessionContext } from 'src/components/App/Session'

function useSession() {
  const { data, status } = useContext(sessionContext)
  return { user: data?.user, isLoading: status === 'loading', signOut, signIn }
}

export default useSession
