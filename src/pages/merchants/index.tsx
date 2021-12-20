import React, { FC, useState } from 'react'

import Head from 'next/head'

import { Tr, Td, useToast } from '@chakra-ui/react'

import ActionsColumn from 'merchants/list/ActionsColumn'
import EditableColumns from 'merchants/list/EditableColumns'

import { useMerchantListQuery } from 'src/generated/hasura'

import Table, { TablePlaceholder } from 'src/components/Table'
import { errorToastContent } from 'src/lib/toastContent'

const TITLE = 'Merchants'
const PER_PAGE = 10

const MerchantList: FC = () => {
  const [isEditable, setIsEditable] = useState(true)
  const toast = useToast()

  const { data, refetch, variables, loading, updateQuery } = useMerchantListQuery({
    variables: { offset: 0, limit: PER_PAGE },
    onError(err) {
      console.error(err)
      toast({ ...errorToastContent, title: err.message })
    },
  })

  if (!data) return <TablePlaceholder title={TITLE} />
  const totalCount = Number(data.merchants_aggregate.aggregate?.totalCount)
  const merchantList = data.merchants

  return (
    <Table
      emptyListHeading="No merchants yet 🤫"
      createHref="merchants/create"
      perPage={PER_PAGE}
      totalRecordsCount={totalCount}
      list={merchantList}
      filtersHeaderProps={{
        isLoading: loading,
        title: TITLE,
        isEditable,
        filterOptions: {
          // ...filters
        },
        onEditableToggle: setIsEditable,
        async onDrawerChange(nullableFilters) {
          const { bank, ...filters } = nullableFilters || {}
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
      rowRender={(item, index) => (
        <Tr key={item.id}>
          <Td>{index + 1}.</Td>

          <EditableColumns
            merchant={item}
            isEditable={isEditable}
            onMerchantUpdate={(updatedMerchant) =>
              updateQuery((prev) => ({
                ...prev,
                merchants: prev.merchants.map((item) =>
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
                merchants_aggregate: {
                  ...prev.merchants_aggregate,
                  aggregate: {
                    ...prev.merchants_aggregate.aggregate,
                    totalCount: Number(prev.merchants_aggregate.aggregate?.totalCount) - 1,
                  },
                },
                merchants: prev.merchants.filter(({ id }) => id !== deletedMerchantId),
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
