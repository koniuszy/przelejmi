import React, { FC } from 'react'

import Head from 'next/head'

import ClientTable from 'src/components/Pages/clients/ClientTable'

const ClientTablePage: FC = () => (
  <>
    <Head>
      <title>Clients | przelejmi</title>
    </Head>
    <main>
      <ClientTable />
    </main>
  </>
)

export default ClientTablePage
