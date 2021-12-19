import React, { FC, useState } from 'react'

import Head from 'next/head'

import { Tr, Td, useToast } from '@chakra-ui/react'

import ActionsColumn from 'invoices/list/ActionsColumn'
import Columns from 'invoices/list/Columns'

import { useInvoiceListQuery } from 'src/generated/hasura'

import Table, { TablePlaceholder } from 'src/components/Table'
import { errorToastContent } from 'src/lib/toastContent'

const TITLE = 'Invoices'
const PER_PAGE = 10

const MerchantList: FC = () => {
  const [isEditable, setIsEditable] = useState(true)
  const toast = useToast()

  const { data, refetch, variables, loading, updateQuery } = useInvoiceListQuery({
    variables: { skip: 0, take: PER_PAGE },
    fetchPolicy: 'cache-and-network',
    onError(err) {
      console.error(err)
      toast({ ...errorToastContent, title: err.message })
    },
  })

  if (!data?.invoiceList) return <TablePlaceholder title={TITLE} />

  const { invoiceList, totalCount, filters } = data

  return (
    <Table
      emptyListHeading="No invoices yet 🤫"
      createHref="merchants/create"
      perPage={PER_PAGE}
      totalRecordsCount={totalCount}
      list={invoiceList}
      variables={variables}
      refetch={refetch}
      filtersHeaderProps={{
        isLoading: loading,
        title: TITLE,
        isEditable,
        filterOptions: { scenario: filters.scenario.map((i) => i.name) },
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
        { title: 'Invoice number', sortableKey: 'invoiceNumber' },
        { title: 'Issue date', sortableKey: 'issueDate' },
        'subtotal',
        'client',
        'merchant',
        'actions',
      ]}
      rowRender={(item, index) => (
        <Tr key={item.id}>
          <Td>{index + 1}.</Td>

          <Columns
            invoice={item}
            isEditable={isEditable}
            onInvoiceUpdate={(updatedMerchant) =>
              updateQuery((prev) => ({
                ...prev,
                merchantList: prev.invoiceList.map((item) =>
                  item.id === updatedMerchant?.id ? updatedMerchant : item
                ),
              }))
            }
          />

          <ActionsColumn
            invoice={item}
            onInvoiceDelete={(deletedMerchantId) =>
              updateQuery((prev) => ({
                ...prev,
                totalCount: prev.totalCount - 1,
                merchantList: prev.invoiceList.filter(({ id }) => id !== deletedMerchantId),
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
