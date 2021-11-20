import React, { FC, useState } from 'react'

import Head from 'next/head'

import { Tr, Td } from '@chakra-ui/react'

import ActionsColumn from 'clients/list/ActionsColumn'
import EditableColumns from 'clients/list/EditableColumns'

import { usePaginatedClientListQuery } from 'src/generated/graphql'

import Table, { TablePlaceholder } from 'src/components/Table'
import { ClientType, DBConditions } from 'src/types'

const PER_PAGE = 10
const TITLE = 'Total clients'

const ClientList: FC = () => {
  const [isEditable, setIsEditable] = useState(true)

  const { data, refetch, variables, loading, updateQuery } = usePaginatedClientListQuery({
    variables: { skip: 0, take: PER_PAGE },
    fetchPolicy: 'cache-and-network',
  })

  if (!data?.clientList) return <TablePlaceholder title={TITLE} />

  const {
    clientList,
    totalCount,
    filters: { __typename, ...filters },
  } = data

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
      rowRender={(item, index) => (
        <Tr key={item.id}>
          <Td>{index + 1}.</Td>
          <EditableColumns
            client={item}
            isEditable={isEditable}
            onClientUpdate={(updatedClient) =>
              updateQuery((prev) => ({
                ...prev,
                clientList: prev.clientList.map((item) =>
                  item.id === updatedClient?.id ? updatedClient : item
                ),
              }))
            }
          />
          <ActionsColumn
            client={item}
            onClientDelete={(deletedClientId) =>
              updateQuery((prev) => ({
                ...prev,
                totalCount: prev.totalCount - 1,
                clientList: prev.clientList.filter(({ id }) => id !== deletedClientId),
              }))
            }
          />
        </Tr>
      )}
    />
  )
}

const ClientListPage: FC = () => (
  <>
    <Head>
      <title>Clients | przelejmi</title>
    </Head>
    <main>
      <ClientList />
    </main>
  </>
)

export default ClientListPage
