import React, { FC, useState } from 'react'

import Head from 'next/head'

import { Tr, Td } from '@chakra-ui/react'

import { MerchantWhereInput, usePaginatedMerchantListQuery } from 'src/generated/graphql'

import Table, { TablePlaceholder } from 'src/components/Table'
import ActionsColumn from 'src/modules/merchants/list/ActionsColumn'
import EditableColumns from 'src/modules/merchants/list/EditableColumns'

const TITLE = 'Total merchants'
const PER_PAGE = 10

const MerchantList: FC = () => {
  const [isEditable, setIsEditable] = useState(true)

  const { data, refetch, variables, loading, updateQuery } = usePaginatedMerchantListQuery({
    variables: { skip: 0, take: PER_PAGE },
    fetchPolicy: 'cache-and-network',
  })

  if (!data?.merchantList) return <TablePlaceholder title={TITLE} />

  const {
    merchantList,
    totalCount,
    filters: { __typename, ...filters },
  } = data

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
        async onDrawerChange(nullableFilters) {
          const { bank, ...filters } = nullableFilters || {}
          const where: MerchantWhereInput = { ...filters }
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
      rowRender={(item, index) => (
        <Tr key={item.id}>
          <Td>{index + 1}.</Td>

          <EditableColumns
            merchant={item}
            isEditable={isEditable}
            onMerchantUpdate={(updatedMerchant) =>
              updateQuery((prev) => ({
                ...prev,
                merchantList: prev.merchantList.map((item) =>
                  item.id === updatedMerchant?.id ? updatedMerchant : item
                ),
              }))
            }
          />

          <ActionsColumn
            merchant={item}
            onMerchantDelete={(deletedMerchantId) =>
              updateQuery((prev) => ({
                ...prev,
                totalCount: prev.totalCount - 1,
                merchantList: prev.merchantList.filter(({ id }) => id !== deletedMerchantId),
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
