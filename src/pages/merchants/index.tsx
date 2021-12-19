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
    fetchPolicy: 'cache-and-network',
    onError(err) {
      console.error(err)
      toast({ ...errorToastContent, title: err.message })
    },
  })

  if (!data) return <TablePlaceholder title={TITLE} />
  const totalCount = Number(data.Merchant_aggregate.aggregate?.totalCount)
  const merchantList = data.Merchant

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
                Merchant: prev.Merchant.map((item) =>
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
                Merchant_aggregate: {
                  ...prev.Merchant_aggregate,
                  aggregate: {
                    ...prev.Merchant_aggregate.aggregate,
                    totalCount: Number(prev.Merchant_aggregate.aggregate?.totalCount) - 1,
                  },
                },
                Merchant: prev.Merchant.filter(({ id }) => id !== deletedMerchantId),
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
