import React, { FC, useState } from 'react'

import Head from 'next/head'

import { Tr, Td } from '@chakra-ui/react'

import ActionsColumn from 'clients/list/ActionsColumn'
import EditableColumns from 'clients/list/EditableColumns'

import { useClientListQuery } from 'src/generated/hasura'

import Table, { TablePlaceholder } from 'src/components/Table'
import { ClientType, DBConditions } from 'src/types'

const PER_PAGE = 10
const TITLE = 'Clients'

const ClientList: FC = () => {
  const [isEditable, setIsEditable] = useState(true)

  const { data, refetch, variables, loading, updateQuery } = useClientListQuery({
    variables: { limit: PER_PAGE, offset: 0 },
    fetchPolicy: 'cache-and-network',
  })

  if (!data) return <TablePlaceholder title={TITLE} />
  const totalCount = Number(data.Client_aggregate.aggregate?.totalCount)
  const clientList = data.Client

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
        'vatId',
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
          // ...filters,
          type: Object.values(ClientType),
        },
        onEditableToggle: setIsEditable,
        async onDrawerChange(newFilters) {
          if (!newFilters) {
            await refetch({ where: newFilters })
            return
          }

          const { type, ...rest } = newFilters
          let VatIdFilters = {}

          if (type) {
            if (type[DBConditions.notIncludes]) {
              const [clientType] = type[DBConditions.notIncludes]

              if (clientType === ClientType.company)
                VatIdFilters = { VATId: { [DBConditions.equals]: null } }

              if (clientType === ClientType.person)
                VatIdFilters = {
                  [DBConditions.not]: { VATId: { [DBConditions.equals]: null } },
                }
            }

            if (type[DBConditions.includes]?.length === 0)
              VatIdFilters = { VATId: { [DBConditions.includes]: [] } }
          }

          await refetch({ where: { ...rest, ...VatIdFilters } })
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
                Client: prev.Client.map((item) =>
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
                Client_aggregate: {
                  ...prev.Client_aggregate,
                  aggregate: {
                    ...prev.Client_aggregate.aggregate,
                    totalCount: Number(prev.Client_aggregate.aggregate?.totalCount) - 1,
                  },
                },
                Client: prev.Client.filter(({ id }) => id !== deletedClientId),
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
