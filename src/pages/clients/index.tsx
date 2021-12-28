import React, { FC, useState } from 'react'

import { NextPage } from 'next'

import Head from 'next/head'
import NextLink from 'next/link'

import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Tr,
  Td,
  Text,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useToast,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'

import {
  ClientListQueryVariables,
  Clients_Order_By,
  Order_By,
  useClientListQuery,
  ClientListQuery,
  Clients_Set_Input,
  useUpdateClientMutation,
  useDeleteClientMutation,
  ClientListDocument,
} from 'src/generated/hasura'

import Clipboard from 'src/components/Clipboard'
import ConfirmationPopup from 'src/components/ConfirmationPopup'
import Editable from 'src/components/Editable'
import Table, { TablePlaceholder } from 'src/components/Table'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

type Client = ClientListQuery['clients'][number]

const ActionsColumn: FC<{
  client: Client
}> = ({ client }) => {
  const toast = useToast()

  const [clientIdToDelete, setClientIdToDelete] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)

  const [deleteClient, deleteClientOptions] = useDeleteClientMutation({
    refetchQueries: [ClientListDocument],
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Client deleted.',
      })
      setClientIdToDelete(null)
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  return (
    <Td>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          cursor="pointer"
          colorScheme="teal"
          onClick={() => setOpenActionsRowId(openActionsRowId === client.id ? null : client.id)}
        >
          …
        </MenuButton>
        <MenuList>
          <NextLink prefetch={false} href={`clients/${client.id}`}>
            <MenuItem justifyContent="start" icon={<EditIcon w={3} h={3} />}>
              Edit
            </MenuItem>
          </NextLink>

          <Clipboard
            value={client.vatId || ''}
            onCopy={() =>
              toast({
                ...successToastContent,
                title: 'Saved in clipboard',
                description: `VAT ID: ${client.vatId}`,
              })
            }
          >
            <MenuItem isDisabled={!client.vatId} bg="gray.700" icon={<CopyIcon w={3} h={3} />}>
              <Text>Copy VAT ID</Text>
            </MenuItem>
          </Clipboard>

          <Clipboard
            value={client.address}
            onCopy={() =>
              toast({
                ...successToastContent,
                title: 'Saved in clipboard',
                description: `Address: ${client.address}`,
              })
            }
          >
            <MenuItem icon={<CopyIcon w={3} h={3} />}>
              <Text>Copy address</Text>
            </MenuItem>
          </Clipboard>

          <MenuItem
            py="0.4rem"
            px="0.8rem"
            color="red"
            _focus={{ color: 'white', bg: 'red' }}
            icon={<DeleteIcon w={3} h={3} />}
            onClick={() => setClientIdToDelete(client.id)}
          >
            <Text>Delete</Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <ConfirmationPopup
        confirmText="Delete"
        isLoading={deleteClientOptions.loading}
        isOpen={client.id === clientIdToDelete}
        onConfirm={() => deleteClient({ variables: { where: { id: { _eq: client.id } } } })}
        onClose={() => {
          setClientIdToDelete(null)
          setOpenActionsRowId(null)
        }}
      >
        <Text>You are going to delete client:</Text>
        <UnorderedList mb={4}>
          <ListItem fontWeight="600">{client.name}</ListItem>
        </UnorderedList>

        {Boolean(client.scenarios.length) && (
          <>
            <Text>You are going to delete scenarios:</Text>
            <UnorderedList>
              {client.scenarios.map((i) => (
                <ListItem fontWeight="600" key={i.id}>
                  {i.name}
                </ListItem>
              ))}
            </UnorderedList>
          </>
        )}
      </ConfirmationPopup>
    </Td>
  )
}

const EditableColumns: FC<{
  client: Client
  isEditable: boolean
  onClientUpdateStart: () => void
  onClientUpdateSuccess: (client: Client) => void
}> = ({ client, isEditable, onClientUpdateSuccess, onClientUpdateStart }) => {
  const toast = useToast()

  const [updateClient] = useUpdateClientMutation({
    onCompleted({ update_clients }) {
      if (!update_clients) throw new Error()
      toast({ ...successToastContent, title: 'Client updated' })
      update_clients.returning.map((i) => onClientUpdateSuccess({ ...client, ...i }))
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(set: Clients_Set_Input) {
    const [[key, value]] = Object.entries(set)

    if (client[key] === value) return

    if (value === '' && set.vat_id !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    onClientUpdateStart()
    updateClient({ variables: { where: { id: { _eq: client.id } }, _set: set } })
  }

  return (
    <>
      <Td>
        <Editable
          defaultValue={client.name}
          isDisabled={!isEditable}
          onSubmit={(name) => handleUpdate({ name })}
        />
      </Td>
      <Td>{client.vatId ? 'Company' : 'Person'}</Td>
      <Td>
        <Editable
          defaultValue={client.vatId || ''}
          isDisabled={!isEditable}
          onSubmit={(vat_id) => handleUpdate({ vat_id })}
        />
      </Td>
      <Td>
        <Editable
          defaultValue={client.address}
          isDisabled={!isEditable}
          onSubmit={(address) => handleUpdate({ address })}
        />
      </Td>
      <Td>
        <Editable
          defaultValue={client.postCode}
          isDisabled={!isEditable}
          onSubmit={(post_code) => handleUpdate({ post_code })}
        />
      </Td>
      <Td>
        <Editable
          defaultValue={client.city}
          isDisabled={!isEditable}
          onSubmit={(city) => handleUpdate({ city })}
        />
      </Td>
      <Td>
        <Editable
          defaultValue={client.country}
          isDisabled={!isEditable}
          onSubmit={(country) => handleUpdate({ country })}
        />
      </Td>
    </>
  )
}

const TITLE = 'Clients'
const PER_PAGE = 10

type ActiveSorts = Partial<Record<keyof Clients_Order_By, Order_By>>

const ClientList: FC<{
  listQuery: ClientListQuery
  loading: boolean
  currentPage: number
  activeSorts: ActiveSorts
  onPageChange: (p: number) => void
  onListQueryUpdate: (data: Partial<ClientListQuery>) => void
  onSortChange: (args: { sortBy: keyof Clients_Order_By; sortDirection: Order_By }) => void
  onSearch: (search: string) => void
}> = ({
  listQuery,
  loading,
  currentPage,
  activeSorts,
  onListQueryUpdate,
  onPageChange,
  onSortChange,
  onSearch,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const [isEditable, setIsEditable] = useState(true)

  const totalCount = Number(listQuery.clients_aggregate.aggregate?.totalCount)
  const columnList: { title: string; sortKey?: keyof Clients_Order_By }[] = [
    { title: `total: ${totalCount}` },
    { title: 'name', sortKey: 'name' },
    { title: 'type' },
    { title: 'vatId' },
    { title: 'address' },
    { title: 'post Code' },
    { title: 'city' },
    { title: 'country' },
    { title: 'actions' },
  ]

  const clientList = listQuery.clients
  const showSyncingSpinner = loading || isMutating

  return (
    <Table
      emptyListHeading="No clients yet 🤫"
      createHref="clients/create"
      perPage={PER_PAGE}
      list={clientList}
      columnList={columnList}
      currentPage={currentPage}
      totalRecordsCount={totalCount}
      activeSorts={activeSorts}
      filtersProps={{
        isFilterButtonActive: true,
        showSyncingSpinner,
        filters: [],
        title: TITLE,
        isEditable,
        onEditableToggle: setIsEditable,
        onSearch,
        async onDrawerChange(newFilters) {},
      }}
      rowRender={(item, index) => (
        <Tr key={item.id}>
          <Td>{index + 1}.</Td>
          <EditableColumns
            client={item}
            isEditable={isEditable}
            onClientUpdateStart={() => {
              setIsMutating(true)
            }}
            onClientUpdateSuccess={(updatedClient) => {
              setIsMutating(false)
              onListQueryUpdate({
                clients: clientList.map((item) =>
                  item.id === updatedClient?.id ? updatedClient : item
                ),
              })
            }}
          />
          <ActionsColumn client={item} />
        </Tr>
      )}
      onPageChange={onPageChange}
      onSortChange={({ sortDirection, sortBy }) => onSortChange({ sortBy, sortDirection })}
    />
  )
}

const ClientListPage: NextPage = () => {
  const toast = useToast()

  const [variables, setVariables] = useState<ClientListQueryVariables>({
    limit: PER_PAGE,
    offset: 0,
  })
  const { data, loading, updateQuery, previousData } = useClientListQuery({
    variables,
    onError(err) {
      console.error(err)
      toast({ ...errorToastContent, title: err.message })
    },
  })

  function getActiveSorts() {
    const activeSorts: ActiveSorts = {}

    if (variables.order_by && !Array.isArray(variables.order_by) && variables.order_by.name) {
      activeSorts.name = variables.order_by.name
    }

    return activeSorts
  }

  const listQuery = data || previousData

  return (
    <>
      <Head>
        <title>Clients | przelejmi</title>
      </Head>
      {listQuery ? (
        <ClientList
          listQuery={listQuery}
          loading={loading}
          currentPage={
            variables?.offset && variables.limit ? variables.offset / variables.limit + 1 : 1
          }
          activeSorts={getActiveSorts()}
          onSearch={(search) =>
            setVariables({
              ...variables,
              where: {
                _or: [
                  { name: { _ilike: `%${search}%` } },
                  {
                    address: { _ilike: `%${search}%` },
                  },
                  {
                    country: { _ilike: `%${search}%` },
                  },
                  {
                    vat_id: { _ilike: `%${search}%` },
                  },
                  {
                    post_code: { _ilike: `%${search}%` },
                  },
                  {
                    city: { _ilike: `%${search}%` },
                  },
                ],
              },
            })
          }
          onListQueryUpdate={(data) => updateQuery((i) => ({ ...i, ...data }))}
          onPageChange={(page) => setVariables({ ...variables, offset: PER_PAGE * (page - 1) })}
          onSortChange={({ sortBy, sortDirection }) =>
            setVariables({ ...variables, order_by: { [sortBy]: sortDirection } })
          }
        />
      ) : (
        <TablePlaceholder title={TITLE} />
      )}
    </>
  )
}

export default ClientListPage
