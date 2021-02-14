import React, { FC } from 'react'

import Head from 'next/head'

import MerchantTable from 'src/components/Pages/merchants/MerchantTable'

const MerchantTablePage: FC = () => (
  <main>
    <Head>
      <title>Merchants | przelejmi</title>
    </Head>
    <MerchantTable />
  </main>
)

export default MerchantTablePage
