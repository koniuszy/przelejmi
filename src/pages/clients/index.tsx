import React, { FC } from 'react'

import { InferGetServerSidePropsType } from 'next'

import Head from 'next/head'

import { PaginatedClientListQuery } from 'src/generated/graphql'

import ClientList from 'src/clients/ClientList'
import { getPaginatedClientListData } from 'src/lib/prisma/clients'
import { withSession } from 'src/lib/session'

export const getServerSideProps = withSession<{
  paginatedClientListQuery: PaginatedClientListQuery
}>(async () => {
  const paginatedClientList = await getPaginatedClientListData({ skip: 0, take: 10 })
  return { props: { paginatedClientListQuery: { paginatedClientList } } }
})

const ClientListPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  paginatedClientListQuery,
}) => (
  <>
    <Head>
      <title>Clients | przelejmi</title>
    </Head>
    <main>
      <ClientList initialListQuery={paginatedClientListQuery} />
    </main>
  </>
)

export default ClientListPage
