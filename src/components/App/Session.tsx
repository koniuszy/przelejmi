import { createContext, FC, useEffect } from 'react'

import { useRouter } from 'next/router'

import {
  useSession,
  SessionProvider as NextAuthProvider,
  SessionContextValue,
} from 'next-auth/react'

export const sessionContext = createContext<SessionContextValue>({
  status: 'loading',
  data: null,
})

export const SessionProvider: FC<{ session: any }> = (props) => (
  <NextAuthProvider session={props.session}>
    <OwnSessionProvider>{props.children}</OwnSessionProvider>
  </NextAuthProvider>
)

const OwnSessionProvider: FC = (props) => {
  const session = useSession({ required: false })
  const router = useRouter()

  // const sessionContextValue: typeof session =
  //   process.env.NODE_ENV === 'development'
  //     ? { data: { user: { name: 'michu' }, expires: '' }, status: 'authenticated' }
  //     : session

  useEffect(() => {
    if (session.status === 'loading') return
    if (session.status === 'unauthenticated') router.push('/')
  }, [session.status])

  return <sessionContext.Provider value={session}>{props.children}</sessionContext.Provider>
}
