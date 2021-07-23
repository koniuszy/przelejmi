import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { getSession } from 'next-auth/client'

export const withSession =
  <T>(callback: () => Promise<GetServerSidePropsResult<T>>) =>
  async ({ req, resolvedUrl }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
    const session = await getSession({ req })

    if (session?.user || process.env.NODE_ENV === 'development') {
      return await callback()
    }

    const searchParams = new URLSearchParams()
    searchParams.append('callbackUrl', resolvedUrl)

    return {
      redirect: {
        destination: `/api/auth/signin?${String(searchParams)}`,
        permanent: false,
      },
    }
  }
