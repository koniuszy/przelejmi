import React, { FC, useState } from 'react'

import { NextPage } from 'next'

import Head from 'next/head'

import { Tr, Td, useToast } from '@chakra-ui/react'

import ActionsColumn from 'invoices/list/ActionsColumn'
import Columns from 'invoices/list/Columns'

import {
  InvoiceListQuery,
  InvoiceListQueryVariables,
  useInvoiceListQuery,
} from 'src/generated/hasura'

import Table, { TablePlaceholder, ColumnListItem } from 'src/components/Table'
import { errorToastContent } from 'src/lib/toastContent'

const TITLE = 'Invoices'
const PER_PAGE = 10

const InvoiceList: FC<{
  listQuery: InvoiceListQuery
  loading: boolean
  currentPage: number
  onPageChange: (p: number) => void
  onListQueryUpdate: (data: Partial<InvoiceListQuery>) => void
}> = ({ listQuery, loading, currentPage, onListQueryUpdate, onPageChange }) => {
  const totalCount = Number(listQuery.invoices_aggregate.aggregate?.totalCount)

  const [isEditable, setIsEditable] = useState(true)
  const [columnList, setColumnList] = useState<ColumnListItem[]>([
    `total: ${totalCount}`,
    { title: 'Invoice number', sortKey: 'invoiceNumber', sort: null },
    { title: 'Issue date', sortKey: 'issueDate', sort: null },
    'subtotal',
    'client',
    'merchant',
    'actions',
  ])

  const invoiceList = listQuery.invoices

  return (
    <Table
      emptyListHeading="No invoices yet 🤫"
      createHref="invoices/create"
      perPage={PER_PAGE}
      list={invoiceList}
      columnList={columnList}
      currentPage={currentPage}
      totalRecordsCount={totalCount}
      filtersProps={{
        isFilterButtonActive: true,
        showSyncingSpinner: loading,
        filters: [],
        title: TITLE,
        isEditable: isEditable,
        onEditableToggle: setIsEditable,
        async onSearch(search) {},
        async onDrawerChange(newFilters) {},
      }}
      rowRender={(item, index) => (
        <Tr key={item.id}>
          <Td>{index + 1}.</Td>
          <Columns
            invoice={item}
            isEditable={isEditable}
            onInvoiceUpdate={(updatedInvoice) =>
              onListQueryUpdate({
                invoices: invoiceList.map((item) =>
                  item.id === updatedInvoice?.id ? updatedInvoice : item
                ),
              })
            }
          />
          <ActionsColumn
            invoice={item}
            onInvoiceDelete={(deletedInvoiceId) =>
              onListQueryUpdate({
                invoices_aggregate: {
                  ...listQuery.invoices_aggregate,
                  aggregate: {
                    ...listQuery.invoices_aggregate.aggregate,
                    totalCount: totalCount - 1,
                  },
                },
                invoices: invoiceList.filter(({ id }) => id !== deletedInvoiceId),
              })
            }
          />
        </Tr>
      )}
      onPageChange={onPageChange}
      onColumnListChange={setColumnList}
    />
  )
}

const InvoiceListPage: NextPage = () => {
  const toast = useToast()

  const [variables, setVariables] = useState<InvoiceListQueryVariables>({
    limit: PER_PAGE,
    offset: 0,
  })
  const { data, loading, updateQuery } = useInvoiceListQuery({
    variables,
    onError(err) {
      console.error(err)
      toast({ ...errorToastContent, title: err.message })
    },
  })

  return (
    <>
      <Head>
        <title>Invoices | przelejmi</title>
      </Head>
      <main>
        {data ? (
          <InvoiceList
            listQuery={data}
            loading={loading}
            currentPage={
              variables?.offset && variables.limit ? variables.offset / variables.limit + 1 : 1
            }
            onListQueryUpdate={(data) => updateQuery((i) => ({ ...i, ...data }))}
            onPageChange={(page) => setVariables((p) => ({ ...p, offset: PER_PAGE * (page - 1) }))}
          />
        ) : (
          <TablePlaceholder title={TITLE} />
        )}
      </main>
    </>
  )
}

export default InvoiceListPage
