import React, { FC } from 'react'

import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from 'next'

import Head from 'next/head'

import { getSession } from 'next-auth/client'

import MerchantList from 'src/components/Pages/merchants/MerchantList'
import { PaginatedMerchantListQuery } from 'src/generated/graphql'
import { getPaginatedMerchantListData } from 'src/lib/prisma/helpers'

export async function getServerSideProps({
  req,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<{ paginatedMerchantListQuery: PaginatedMerchantListQuery }>
> {
  const session = await getSession({ req })

  if (session?.user) {
    const paginatedMerchantList = await getPaginatedMerchantListData({ skip: 0, take: 10 })
    return { props: { paginatedMerchantListQuery: { paginatedMerchantList } } }
  }

  return {
    redirect: {
      destination: '/api/auth/signin?callbackUrl=https%3A%2F%2Fprzelejmi.pl%2F',
      permanent: false,
    },
  }
}

const MerchantListPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  paginatedMerchantListQuery,
}) => (
  <main>
    <Head>
      <title>Merchants | przelejmi</title>
    </Head>
    <MerchantList initialList={paginatedMerchantListQuery} />
  </main>
)

export default MerchantListPage
