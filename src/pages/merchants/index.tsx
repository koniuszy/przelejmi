import React, { FC, useState } from 'react'

import { NextPage } from 'next'

import Head from 'next/head'

import { Tr, Td, useToast } from '@chakra-ui/react'

import ActionsColumn from 'merchants/list/ActionsColumn'
import EditableColumns from 'merchants/list/EditableColumns'

import {
  MerchantListQueryVariables,
  useMerchantListQuery,
  MerchantListQuery,
} from 'src/generated/hasura'

import Table, { ColumnListItem, TablePlaceholder } from 'src/components/Table'
import { errorToastContent } from 'src/lib/toastContent'

const TITLE = 'Merchants'
const PER_PAGE = 10

const MerchantList: FC<{
  listQuery: MerchantListQuery
  loading: boolean
  currentPage: number
  onPageChange: (p: number) => void
  onListQueryUpdate: (data: Partial<MerchantListQuery>) => void
}> = ({ listQuery, loading, currentPage, onListQueryUpdate, onPageChange }) => {
  const totalCount = Number(listQuery.merchants_aggregate.aggregate?.totalCount)

  const [isEditable, setIsEditable] = useState(true)
  const [columnList, setColumnList] = useState<ColumnListItem[]>([
    `total: ${totalCount}`,
    { title: 'company', sort: null, sortKey: 'companyName' },
    { title: 'issuer', sort: null, sortKey: 'issuerName' },
    'email',
    'bank',
    'actions',
  ])

  if (!listQuery) return <TablePlaceholder title={TITLE} />
  const merchantList = listQuery.merchants

  return (
    <Table
      emptyListHeading="No merchants yet 🤫"
      createHref="merchants/create"
      perPage={PER_PAGE}
      totalRecordsCount={totalCount}
      list={merchantList}
      currentPage={currentPage}
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
      columnList={columnList}
      rowRender={(item, index) => (
        <Tr key={item.id}>
          <Td>{index + 1}.</Td>

          <EditableColumns
            merchant={item}
            isEditable={isEditable}
            onMerchantUpdate={(updatedMerchant) =>
              onListQueryUpdate({
                merchants: listQuery.merchants.map((item) =>
                  item.id === updatedMerchant?.id ? updatedMerchant : item
                ),
              })
            }
          />

          <ActionsColumn
            merchant={item}
            onMerchantDelete={(deletedMerchantId) =>
              onListQueryUpdate({
                merchants_aggregate: {
                  ...listQuery.merchants_aggregate,
                  aggregate: {
                    ...listQuery.merchants_aggregate.aggregate,
                    totalCount: totalCount - 1,
                  },
                },
                merchants: listQuery.merchants.filter(({ id }) => id !== deletedMerchantId),
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

const MerchantListPage: NextPage = () => {
  const toast = useToast()

  const [variables, setVariables] = useState<MerchantListQueryVariables>({
    limit: PER_PAGE,
    offset: 0,
  })
  const { data, loading, updateQuery } = useMerchantListQuery({
    variables,
    onError(err) {
      console.error(err)
      toast({ ...errorToastContent, title: err.message })
    },
  })

  return (
    <>
      <Head>
        <title>Merchants | przelejmi</title>
      </Head>
      <main>
        {data ? (
          <MerchantList
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

export default MerchantListPage
