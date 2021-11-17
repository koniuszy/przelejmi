import { createContext, FC, useEffect } from 'react'

import { useRouter } from 'next/router'

import { Session } from 'next-auth'
import { useSession } from 'next-auth/client'

export const sessionContext = createContext<[Session | null, boolean]>([null, true])

export const SessionProvider: FC = ({ children }) => {
  const [session, isSessionLoading] = useSession()
  const router = useRouter()

  const sessionContextValue: [Session | null, boolean] =
    process.env.NODE_ENV === 'development'
      ? [
          {
            user: {
              name: 'test user',
              email: '',
              image: '',
            },
            expires: '',
          },
          false,
        ]
      : [session, isSessionLoading]

  useEffect(() => {
    if (!session?.user) router.push('/')
  }, [session?.user?.name])

  return <sessionContext.Provider value={sessionContextValue}>{children}</sessionContext.Provider>
}
