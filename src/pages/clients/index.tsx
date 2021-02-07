import React, { FC, useState } from 'react'

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
  useDisclosure,
  Spinner,
} from '@chakra-ui/react'

import { Client } from 'prisma/prisma-client'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import {
  useUpdateClientMutation,
  PaginatedClientListDocument,
  usePaginatedClientListQuery,
  useDeleteClientMutation,
} from 'src/generated/graphql'
import { ClientType, DBConditions } from 'src/types'

import Clipboard from 'src/components/Clipboard'
import Confirmation from 'src/components/Confirmation'
import Editable from 'src/components/Editable'
import Table from 'src/components/Table'

export const PER_PAGE = 10

const App: FC = () => {
  const toast = useToast()

  const [isEditable, setIsEditable] = useState(false)
  const [clientDeletionId, setClientDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)
  const drawerOptions = useDisclosure()

  const { data, refetch, variables } = usePaginatedClientListQuery({
    variables: { skip: 0, take: PER_PAGE },
  })

  const [updateClient, updateClientOptions] = useUpdateClientMutation({
    onCompleted(response) {
      toast({ ...successToastContent, title: 'Client updated' })
      updateClientOptions.client.writeQuery({
        query: PaginatedClientListDocument,
        variables,
        data: {
          ...data,
          paginatedClientList: data.paginatedClientList.list.map((item) =>
            item.id === response.updatedClient.id ? response.updatedClient : item
          ),
        },
      })
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  const [deleteClient, deleteClientOptions] = useDeleteClientMutation({
    onCompleted(response) {
      toast({
        ...successToastContent,
        title: 'Client deleted.',
      })
      setClientDeletionId(null)

      deleteClientOptions.client.writeQuery({
        query: PaginatedClientListDocument,
        variables,
        data: {
          ...data,
          paginatedClientList: {
            ...data.paginatedClientList,
            list: data.paginatedClientList.list.filter(
              ({ id }) => id !== response.deletedClient.id
            ),
          },
        },
      })
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(data: Partial<Client>, id: number) {
    const [value] = Object.values(data)
    if (value === '' && data.VATId !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateClient({ variables: { data, id } })
  }

  if (!data) return <Spinner />

  const clientList = data.paginatedClientList.list
  const totalRecordsCount = data.paginatedClientList.totalCount

  return (
    <div>
      <Head>
        <title>Clients | przelejmi</title>
      </Head>

      <main>
        <Table
          emptyListHeading="No clients yet 🤫"
          createHref="clients/create"
          perPage={PER_PAGE}
          totalRecordsCount={totalRecordsCount}
          list={clientList}
          variables={variables}
          refetch={refetch}
          filtersHeaderProps={{
            title: 'Total clients',
            isEditable: isEditable,
            filterOptions: { ...data.paginatedClientList.filters, type: Object.values(ClientType) },
            drawerOptions: drawerOptions,
            onEditableToggle: setIsEditable,
            onDrawerChange(newFilters) {
              if (!newFilters) {
                refetch({ where: newFilters })
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

              refetch({ where: { ...rest, ...VATIdFilters } })
            },
          }}
          headerList={[
            `total: ${totalRecordsCount}`,
            { title: 'name', sortableKey: 'name' },
            'type',
            'VATId',
            'address',
            'post Code',
            'city',
            'country',
            'actions',
          ]}
          rowRender={(item: Client, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}.</Td>
              <Td>
                <Editable
                  defaultValue={item.name}
                  isDisabled={!isEditable}
                  onSubmit={(name) => handleUpdate({ name }, item.id)}
                />
              </Td>
              <Td>{item.VATId ? ClientType.company : ClientType.person}</Td>
              {['VATId', 'address', 'post Code', 'city', 'country'].map((key) => (
                <Td key={key}>
                  <Editable
                    defaultValue={item[key]}
                    isDisabled={!isEditable}
                    onSubmit={(value) => handleUpdate({ [key]: value }, item.id)}
                  />
                </Td>
              ))}
              <Td>
                <Menu closeOnSelect={false} onClose={() => setClientDeletionId(null)}>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    cursor="pointer"
                    colorScheme="teal"
                    onClick={() =>
                      setOpenActionsRowId(openActionsRowId === item.id ? null : item.id)
                    }
                  >
                    …
                  </MenuButton>
                  <MenuList>
                    <NextLink href={`clients/${item.id}`}>
                      <MenuItem justifyContent="start" icon={<EditIcon w={3} h={3} />}>
                        Edit
                      </MenuItem>
                    </NextLink>

                    <Clipboard
                      value={item.VATId}
                      onCopy={() =>
                        toast({
                          ...successToastContent,
                          title: 'Saved in clipboard',
                          description: `VAT id: ${item.VATId}`,
                        })
                      }
                    >
                      <MenuItem icon={<CopyIcon w={3} h={3} />}>
                        <Text>Copy VAT id</Text>
                      </MenuItem>
                    </Clipboard>

                    <Clipboard
                      value={item.address}
                      onCopy={() =>
                        toast({
                          ...successToastContent,
                          title: 'Saved in clipboard',
                          description: `Address: ${item.address}`,
                        })
                      }
                    >
                      <MenuItem icon={<CopyIcon w={3} h={3} />}>
                        <Text>Copy address</Text>
                      </MenuItem>
                    </Clipboard>

                    <Confirmation
                      confirmText="delete"
                      isLoading={deleteClientOptions.loading}
                      id={item.id === clientDeletionId ? clientDeletionId : null}
                      onClick={() => deleteClient({ variables: { id: item.id } })}
                      onClose={() => {
                        setClientDeletionId(null)
                        setOpenActionsRowId(null)
                      }}
                    >
                      <MenuItem
                        bg="red.500"
                        py="0.4rem"
                        px="0.8rem"
                        _focus={{ bg: 'red.400' }}
                        icon={<DeleteIcon w={3} h={3} />}
                        onClick={() => setClientDeletionId(item.id)}
                      >
                        <Text>Delete</Text>
                      </MenuItem>
                    </Confirmation>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          )}
        />
      </main>
    </div>
  )
}

export default App
