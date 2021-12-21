import React, { FC, useState } from 'react'

import { NextPage } from 'next'

import Head from 'next/head'

import { Tr, Td, useToast } from '@chakra-ui/react'

import ActionsColumn from 'clients/list/ActionsColumn'
import EditableColumns from 'clients/list/EditableColumns'

import { ClientListQuery, ClientListQueryVariables, useClientListQuery } from 'src/generated/hasura'

import Table, { TablePlaceholder, ColumnListItem } from 'src/components/Table'
import { errorToastContent } from 'src/lib/toastContent'

const TITLE = 'Clients'
const PER_PAGE = 10

const ClientList: FC<{
  listQuery: ClientListQuery
  loading: boolean
  currentPage: number
  onPageChange: (p: number) => void
  onListQueryUpdate: (data: Partial<ClientListQuery>) => void
}> = ({ listQuery, loading, currentPage, onListQueryUpdate, onPageChange }) => {
  const totalCount = Number(listQuery.clients_aggregate.aggregate?.totalCount)

  const [isEditable, setIsEditable] = useState(true)
  const [columnList, setColumnList] = useState<ColumnListItem[]>([
    `total: ${totalCount}`,
    { title: 'name', sort: null },
    'type',
    'vatId',
    'address',
    'post Code',
    'city',
    'country',
    'actions',
  ])

  const clientList = listQuery.clients

  return (
    <Table
      emptyListHeading="No clients yet 🤫"
      createHref="clients/create"
      perPage={PER_PAGE}
      list={clientList}
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
          <EditableColumns
            client={item}
            isEditable={isEditable}
            onClientUpdate={(updatedClient) =>
              onListQueryUpdate({
                clients: clientList.map((item) =>
                  item.id === updatedClient?.id ? updatedClient : item
                ),
              })
            }
          />
          <ActionsColumn
            client={item}
            onClientDelete={(deletedClientId) =>
              onListQueryUpdate({
                clients_aggregate: {
                  ...listQuery.clients_aggregate,
                  aggregate: {
                    ...listQuery.clients_aggregate.aggregate,
                    totalCount: totalCount - 1,
                  },
                },
                clients: clientList.filter(({ id }) => id !== deletedClientId),
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

const ClientListPage: NextPage = () => {
  const toast = useToast()

  const [variables, setVariables] = useState<ClientListQueryVariables>({
    limit: PER_PAGE,
    offset: 0,
  })
  const { data, loading, updateQuery } = useClientListQuery({
    variables,
    onError(err) {
      console.error(err)
      toast({ ...errorToastContent, title: err.message })
    },
  })

  return (
    <>
      <Head>
        <title>Clients | przelejmi</title>
      </Head>
      {data ? (
        <ClientList
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
    </>
  )
}

export default ClientListPage
