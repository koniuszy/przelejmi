import { useContext } from 'react'

import { sessionContext } from 'src/pages/_app'

function useSession() {
  return useContext(sessionContext)
}

export default useSession
