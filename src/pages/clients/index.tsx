import React, { FC } from 'react'

import Head from 'next/head'

import ClientList from 'src/components/Pages/clients/ClientList'

const ClientListPage: FC = () => (
  <>
    <Head>
      <title>Clients | przelejmi</title>
    </Head>
    <main>
      <ClientList />
    </main>
  </>
)

export default ClientListPage
