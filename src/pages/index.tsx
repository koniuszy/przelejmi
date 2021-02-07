import React, { FC } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'

import { signIn } from 'next-auth/client'

type SSGProps = {
  users: { name: string }[]
}

const App: FC<SSGProps> = (props) => {
  return (
    <div>
      <Head>
        <title>Home page | przelejmi</title>
      </Head>

      <main>
        <button onClick={() => signIn()}>sign in</button>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const users = [{ name: 'sample' }]
  return { props: { users } }
}

export default App
