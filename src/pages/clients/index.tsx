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
  Clients_Order_By,
  Order_By,
  useClientListQuery,
  ClientListQuery,
  Clients_Set_Input,
  useUpdateClientMutation,
  useDeleteClientMutation,
  ClientListDocument,
  useClientDistinctLazyQuery,
} from 'src/generated/hasura'

import Clipboard from 'src/components/Clipboard'
import ConfirmationPopup from 'src/components/ConfirmationPopup'
import Editable from 'src/components/Editable'
import Table, { TablePlaceholder, Filters } from 'src/components/Table'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

type Client = NonNullable<ClientListQuery['clients']>[number]

const ActionsColumn: FC<{
  client: Client
}> = ({ client }) => {
  const toast = useToast()

  const [clientIdToDelete, setClientIdToDelete] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)

  const [deleteClient, deleteClientOptions] = useDeleteClientMutation({
    refetchQueries: [ClientListDocument],
    awaitRefetchQueries: true,
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
  onClientUpdate: (set: Clients_Set_Input) => void
}> = ({ client, isEditable, onClientUpdate }) => {
  const toast = useToast()

  function handleUpdate(set: Clients_Set_Input) {
    const [[key, value]] = Object.entries(set)

    if (client[key] === value) return

    if (value === '' && set.vat_id !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    onClientUpdate(set)
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

const ClientListPage: NextPage = () => {
  const toast = useToast()

  const [isEditable, setIsEditable] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<Filters>([])
  const [sort, setSort] = useState({
    sortBy: null as keyof Clients_Order_By | null,
    sortDirection: Order_By.Asc,
  })

  const { data, loading, updateQuery, previousData } = useClientListQuery({
    variables: {
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
      isSearch: Boolean(search),
      search,
    },
    onError(err) {
      console.error(err)
      toast({ ...errorToastContent, title: err.message })
    },
  })

  const [fetchFilters] = useClientDistinctLazyQuery({
    onCompleted(data) {
      const countryDistinct = data?.countryDistinct.nodes.map((i) => i.country) || []
      const cityDistinct = data?.cityDistinct.nodes.map((i) => i.city) || []

      setFilters([
        { title: 'Country', items: countryDistinct.map((i) => ({ title: i, checked: true })) },
        { title: 'City', items: cityDistinct.map((i) => ({ title: i, checked: true })) },
      ])
    },
  })

  const [updateClient, { loading: isUpdating }] = useUpdateClientMutation({
    onCompleted({ update_clients }) {
      if (!update_clients) throw new Error()
      toast({ ...successToastContent, title: 'Client updated' })
      update_clients.returning.forEach((updatedClient) =>
        updateQuery((v) => ({
          ...v,
          clients: v?.clients?.map((item) =>
            item.id === updatedClient?.id ? { ...item, ...updatedClient } : item
          ),
          search_clients: v?.search_clients?.map((item) =>
            item.id === updatedClient?.id ? { ...item, ...updatedClient } : item
          ),
        }))
      )
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  const totalCount = Number(data?.clients_aggregate.aggregate?.totalCount)
  const columnList = [
    { title: `total: ${data?.clients_aggregate.aggregate?.totalCount}` },
    { title: 'name', sortKey: 'name' },
    { title: 'type' },
    { title: 'vatId' },
    { title: 'address' },
    { title: 'post Code' },
    { title: 'city' },
    { title: 'country' },
    { title: 'actions' },
  ] as const

  const list = search
    ? data?.search_clients || previousData?.search_clients
    : data?.clients || previousData?.clients

  if (!list)
    return (
      <>
        <Head>
          <title>Clients | przelejmi</title>
        </Head>
        <TablePlaceholder title={TITLE} />
      </>
    )

  return (
    <>
      <Head>
        <title>Clients | przelejmi</title>
      </Head>

      <Table
        emptyListHeading="No clients yet 🤫"
        createHref="clients/create"
        perPage={PER_PAGE}
        list={list}
        columnList={columnList}
        currentPage={page}
        totalRecordsCount={totalCount}
        filtersProps={{
          isFilterButtonActive: Boolean(filters.length),
          showSyncingSpinner: loading || isUpdating,
          title: TITLE,
          isEditable,
          onSearch: setSearch,
          onEditableToggle: setIsEditable,
          drawerProps: {
            onOpen: fetchFilters,
            onChange: setFilters,
            filters,
          },
        }}
        rowRender={(item, index) => (
          <Tr key={item.id}>
            <Td>{index + 1}.</Td>
            <EditableColumns
              client={item}
              isEditable={isEditable}
              onClientUpdate={(_set) =>
                updateClient({ variables: { _set, where: { id: { _eq: item.id } } } })
              }
            />
            <ActionsColumn client={item} />
          </Tr>
        )}
        sort={sort}
        onPageChange={setPage}
        onSortChange={setSort}
      />
    </>
  )
}

export default ClientListPage
