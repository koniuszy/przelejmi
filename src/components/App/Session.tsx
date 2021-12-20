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
  // const session = useSession({ required: false })
  const session: SessionContextValue = {
    status: 'authenticated' as const,
    data: {
      expires: 'never',
      user: {
        email: 'test@.com',
        image:
          'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/06/Itachi-Cropped.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5',
      },
    },
  }
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return

    // if (session.status === 'loading' || router.pathname === '/') return
    // if (session.status === 'unauthenticated')
    //   router.push({ pathname: '/api/auth/signin', query: { callbackUrl: window.location.href } })
  }, [session.status, router.pathname])

  return <sessionContext.Provider value={session}>{props.children}</sessionContext.Provider>
}
