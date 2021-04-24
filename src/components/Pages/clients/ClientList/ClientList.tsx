import React, { FC, useState } from 'react'

import { Tr, Td } from '@chakra-ui/react'

import { Client } from 'prisma/prisma-client'

import { usePaginatedClientListQuery } from 'src/generated/graphql'
import { ClientType, DBConditions } from 'src/types'

import Table, { TablePlaceholder } from 'src/components/Table'

import ActionsColumn from './ActionsColumn'
import EditableColumns from './EditableColumns'

export const PER_PAGE = 10

const TITLE = 'Total clients'

const ClientList: FC = () => {
  const [isEditable, setIsEditable] = useState(true)

  const {
    data,
    refetch,
    variables,
    loading,
    previousData,
    updateQuery,
  } = usePaginatedClientListQuery({
    variables: { skip: 0, take: PER_PAGE },
    fetchPolicy: 'cache-and-network',
  })

  const results = data ?? previousData
  if (!results) return <TablePlaceholder title={TITLE} />

  const {
    list: clientList,
    totalCount,
    filters: { __typename, ...filters },
  } = results.paginatedClientList

  return (
    <Table
      emptyListHeading="No clients yet 🤫"
      createHref="clients/create"
      perPage={PER_PAGE}
      totalRecordsCount={totalCount}
      list={clientList}
      variables={variables}
      refetch={refetch}
      headerList={[
        `total: ${totalCount}`,
        { title: 'name', sortableKey: 'name' },
        'type',
        'VATId',
        'address',
        'post Code',
        'city',
        'country',
        'actions',
      ]}
      filtersHeaderProps={{
        title: TITLE,
        isEditable: isEditable,
        isLoading: loading,
        filterOptions: {
          ...filters,
          type: Object.values(ClientType),
        },
        onEditableToggle: setIsEditable,
        async onDrawerChange(newFilters) {
          if (!newFilters) {
            await refetch({ where: newFilters })
            return
          }

          const { type, ...rest } = newFilters
          let VATIdFilters = {}

          if (type) {
            if (type[DBConditions.notIncludes]) {
              const [clientType] = type[DBConditions.notIncludes]

              if (clientType === ClientType.company)
                VATIdFilters = { VATId: { [DBConditions.equals]: null } }

              if (clientType === ClientType.person)
                VATIdFilters = {
                  [DBConditions.not]: { VATId: { [DBConditions.equals]: null } },
                }
            }

            if (type[DBConditions.includes]?.length === 0)
              VATIdFilters = { VATId: { [DBConditions.includes]: [] } }
          }

          await refetch({ where: { ...rest, ...VATIdFilters } })
        },
      }}
      rowRender={(item: Client, index) => (
        <Tr key={item.id}>
          <Td>{index + 1}.</Td>
          <EditableColumns
            client={item}
            isEditable={isEditable}
            onClientUpdate={(updatedClient) =>
              updateQuery((prev) => ({
                ...prev,
                paginatedClientList: {
                  ...prev.paginatedClientList,
                  list: prev.paginatedClientList.list.map((clientListItem) =>
                    clientListItem.id === updatedClient.id ? updatedClient : clientListItem
                  ),
                },
              }))
            }
          />
          <ActionsColumn
            client={item}
            onClientDelete={(deletedClientId) =>
              updateQuery((prev) => ({
                ...prev,
                paginatedClientList: {
                  ...prev.paginatedClientList,
                  totalCount: prev.paginatedClientList.totalCount - 1,
                  list: prev.paginatedClientList.list.filter(({ id }) => id !== deletedClientId),
                },
              }))
            }
          />
        </Tr>
      )}
    />
  )
}

export default ClientList
