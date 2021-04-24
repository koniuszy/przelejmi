import React, { FC } from 'react'

import Head from 'next/head'

import MerchantList from 'src/components/Pages/merchants/MerchantList'

const MerchantListPage: FC = () => (
  <main>
    <Head>
      <title>Merchants | przelejmi</title>
    </Head>
    <MerchantList />
  </main>
)

export default MerchantListPage
