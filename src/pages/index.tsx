import React, { FC } from 'react'

import Head from 'next/head'

import Home from 'src/components/Home'

const HomePage: FC = () => (
  <>
    <Head>
      <title>Home page | przelejmi</title>
    </Head>

    <main>
      <Home />
    </main>
  </>
)

export default HomePage
