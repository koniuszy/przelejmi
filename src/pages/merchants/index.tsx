import React, { FC } from 'react'

import { InferGetServerSidePropsType } from 'next'

import Head from 'next/head'

import MerchantList from 'src/components/Pages/merchants/MerchantList'
import { PaginatedMerchantListQuery } from 'src/generated/graphql'
import { getPaginatedMerchantListData } from 'src/lib/prisma/merchants'
import { withSession } from 'src/lib/session'

export const getServerSideProps = withSession<{
  paginatedMerchantListQuery: PaginatedMerchantListQuery
}>(async () => {
  const paginatedMerchantList = await getPaginatedMerchantListData({ skip: 0, take: 10 })
  return { props: { paginatedMerchantListQuery: { paginatedMerchantList } } }
})

const MerchantListPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  paginatedMerchantListQuery,
}) => (
  <main>
    <Head>
      <title>Merchants | przelejmi</title>
    </Head>
    <MerchantList initialListQuery={paginatedMerchantListQuery} />
  </main>
)

export default MerchantListPage
