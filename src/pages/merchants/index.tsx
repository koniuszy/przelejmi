import React, { FC } from 'react'

import Head from 'next/head'

import { PaginatedMerchantListQuery } from 'src/generated/graphql'
import { getPaginatedMerchantListData } from 'src/lib/prisma/merchants'
import { withSession } from 'src/lib/session'
import MerchantList from 'src/merchants/MerchantList'

interface SSG {
  paginatedMerchantListQuery: PaginatedMerchantListQuery
}

const MerchantListPage: FC<SSG> = ({ paginatedMerchantListQuery }) => (
  <main>
    <Head>
      <title>Merchants | przelejmi</title>
    </Head>
    <MerchantList initialListQuery={paginatedMerchantListQuery} />
  </main>
)

export const getServerSideProps = withSession<SSG>(async () => {
  const paginatedMerchantList = await getPaginatedMerchantListData({ skip: 0, take: 10 })
  return { props: { paginatedMerchantListQuery: { paginatedMerchantList } } }
})

export default MerchantListPage
