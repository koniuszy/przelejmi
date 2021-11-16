import React, { FC, useState } from 'react'

import Head from 'next/head'

import { Tr, Td } from '@chakra-ui/react'

import { Merchant } from 'prisma/prisma-client'

import { usePaginatedMerchantListQuery } from 'src/generated/graphql'

import Table, { TablePlaceholder } from 'src/components/Table'
import ActionsColumn from 'src/merchants/list/ActionsColumn'
import EditableColumns from 'src/merchants/list/EditableColumns'

const PER_PAGE = 10
const TITLE = 'Total merchants'

const MerchantList: FC = () => {
  const [isEditable, setIsEditable] = useState(true)

  const { data, refetch, variables, loading, updateQuery } = usePaginatedMerchantListQuery({
    variables: { skip: 0, take: PER_PAGE },
    fetchPolicy: 'cache-and-network',
  })

  if (!data?.paginatedMerchantList) return <TablePlaceholder title={TITLE} />

  const {
    list: merchantList,
    totalCount,
    filters: { __typename, ...filters },
  } = data.paginatedMerchantList

  return (
    <Table
      emptyListHeading="No merchants yet 🤫"
      createHref="merchants/create"
      perPage={PER_PAGE}
      totalRecordsCount={totalCount}
      list={merchantList}
      variables={variables}
      refetch={refetch}
      filtersHeaderProps={{
        isLoading: loading,
        title: TITLE,
        isEditable,
        filterOptions: { ...filters },
        onEditableToggle: setIsEditable,
        async onDrawerChange({ bank, ...filters }) {
          const where = { ...filters }
          if (bank) where.bankName = bank
          await refetch({ where })
        },
      }}
      headerList={[
        `total: ${totalCount}`,
        { title: 'company', sortableKey: 'companyName' },
        { title: 'issuer', sortableKey: 'issuerName' },
        'email',
        'bank',
        'actions',
      ]}
      rowRender={(item: Merchant, index) => (
        <Tr key={item.id}>
          <Td>{index + 1}.</Td>

          <EditableColumns
            merchant={item}
            isEditable={isEditable}
            onMerchantUpdate={(updatedMerchant) =>
              updateQuery((prev) => ({
                ...prev,
                paginatedMerchantList: {
                  ...prev.paginatedMerchantList,
                  list: prev.paginatedMerchantList.list.map((item) =>
                    item.id === updatedMerchant.id ? updatedMerchant : item
                  ),
                },
              }))
            }
          />

          <ActionsColumn
            merchant={item}
            onMerchantDelete={(deletedMerchantId) =>
              updateQuery((prev) => ({
                ...prev,
                paginatedMerchantList: {
                  ...prev.paginatedMerchantList,
                  totalCount: prev.paginatedMerchantList.totalCount - 1,
                  list: prev.paginatedMerchantList.list.filter(
                    ({ id }) => id !== deletedMerchantId
                  ),
                },
              }))
            }
          />
        </Tr>
      )}
    />
  )
}

const MerchantListPage: FC = () => (
  <main>
    <Head>
      <title>Merchants | przelejmi</title>
    </Head>
    <MerchantList />
  </main>
)

export default MerchantListPage
