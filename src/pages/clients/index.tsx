import React, { FC, useState } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'
import NextLink from 'next/link'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Flex,
  Center,
  useToast,
  Switch,
  FormControl,
  FormLabel,
  Heading,
  useDisclosure,
} from '@chakra-ui/react'

import { Client, PrismaClient } from '@prisma/client'
import ReactPaginate from 'react-paginate'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import {
  useGetClientsQuery,
  useUpdateOneClientMutation,
  GetClientsDocument,
  ClientOrderByInput,
  SortOrder,
} from 'src/generated/graphql'
import { ClientType, DBConditions } from 'src/types'

import DeleteClientPopover from 'src/components/Table/DeleteClientPopover'
import DrawerFilters, { TriggerFiltersButton, Filters } from 'src/components/Table/DrawerFilters'
import EditableCell from 'src/components/Table/EditableCell'
import SearchInput, { Search } from 'src/components/Table/SearchInput'
import SortTh from 'src/components/Table/SortTh'

type FilterOptions = {
  country: string[]
  city: string[]
}

type SSGProps = {
  initialClientList: Client[]
  filterOptions: FilterOptions
}

const App: FC<SSGProps> = ({ initialClientList, filterOptions }) => {
  const toast = useToast()
  const [isEditable, setIsEditable] = useState(false)
  const [clientDeletionId, setClientDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)
  const drawerOptions = useDisclosure()

  const { data, refetch, variables } = useGetClientsQuery()

  const [updateClient, updateClientOptions] = useUpdateOneClientMutation({
    onCompleted(response) {
      toast({ ...successToastContent, title: 'Client updated' })
      updateClientOptions.client.writeQuery({
        query: GetClientsDocument,
        data: {
          ...data,
          clientList: data.clientList.map((item) =>
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

  function handleUpdate(data: Partial<Client>, id: number) {
    const [value] = Object.values(data)
    if (value === '') {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateClient({ variables: { data, id } })
  }

  function handleFiltersRefetch(filters: Search | Filters) {
    refetch({ where: filters })
  }

  const clientList = (data?.clientList || initialClientList) as Client[]
  const orderBy = (variables.orderBy ?? {}) as ClientOrderByInput

  return (
    <div>
      <Head>
        <title>przelejmi | Clients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex justifyContent="space-between" pb="5">
          <Text fontSize="4xl" textAlign="center">
            Your clients:
          </Text>

          <Flex>
            <Center pr="5">
              <SearchInput
                keyList={['name', 'nip', 'address', 'postCode', 'city', 'country']}
                prevFilters={variables.where}
                onSearch={handleFiltersRefetch}
              />
            </Center>

            <Center pr="5">
              <TriggerFiltersButton
                isActive={
                  variables.where &&
                  Object.keys(variables.where).length > 0 &&
                  !Object.keys(variables.where).includes('OR')
                }
                onOpen={drawerOptions.onOpen}
              />
            </Center>

            <Center>
              <FormControl id="editable" display="flex" alignItems="center">
                <FormLabel htmlFor="editable" mb="0">
                  Editable
                </FormLabel>
                <Switch
                  size="lg"
                  colorScheme="teal"
                  defaultChecked={isEditable}
                  onChange={(e) => setIsEditable(e.target.checked)}
                />
              </FormControl>
            </Center>
          </Flex>
        </Flex>

        <Table variant="simple">
          <TableCaption>
            {clientList.length > 0 ? (
              'List of all your clients'
            ) : (
              <>
                <Heading as="h2">No clients yet 🤫</Heading>
                <NextLink href="/create/client">
                  <Button size="lg" mt={5} colorScheme="teal">
                    Create
                  </Button>
                </NextLink>
              </>
            )}
          </TableCaption>
          <Thead>
            <Tr>
              <Th />
              <SortTh
                title="Name"
                isAsc={orderBy.name === 'asc'}
                isDesc={orderBy.name === 'desc'}
                onAsc={() => refetch({ orderBy: { name: SortOrder.Asc } })}
                onDesc={() => refetch({ orderBy: { name: SortOrder.Desc } })}
              />
              <Th>Type</Th>
              <Th>NIP</Th>
              <Th>Address</Th>
              <Th>Post code</Th>
              <Th>City</Th>
              <Th>Country</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clientList.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}.</Td>
                <EditableCell
                  defaultValue={item.name}
                  isDisabled={!isEditable}
                  onSubmit={(name) => handleUpdate({ name }, item.id)}
                />
                <Td>{item.nip ? ClientType.company : ClientType.person}</Td>
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.nip?.toString()}
                  onSubmit={(nip) => handleUpdate({ nip }, item.id)}
                />
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.address}
                  onSubmit={(address) => handleUpdate({ address }, item.id)}
                />
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.postCode}
                  onSubmit={(postCode) => handleUpdate({ postCode }, item.id)}
                />
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.city}
                  onSubmit={(city) => handleUpdate({ city }, item.id)}
                />
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.country}
                  onSubmit={(country) => handleUpdate({ country }, item.id)}
                />
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

                      <DeleteClientPopover
                        id={item.id === clientDeletionId ? clientDeletionId : null}
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
                      </DeleteClientPopover>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </main>

      <DrawerFilters
        filters={filterOptions}
        disclosureOptions={drawerOptions}
        prevFilters={variables.where}
        onChange={(newFilters) => {
          if (!newFilters) {
            handleFiltersRefetch(newFilters)
            return
          }

          const { type, ...rest } = newFilters
          let nipFilters = {}
          if (type) {
            console.log(type)
            if (type[DBConditions.notIncludes]) {
              const [clientType] = type[DBConditions.notIncludes]

              if (clientType === ClientType.company)
                nipFilters = { nip: { [DBConditions.equals]: null } }

              if (clientType === ClientType.person)
                nipFilters = { [DBConditions.not]: { nip: { [DBConditions.equals]: null } } }
            }

            if (type[DBConditions.includes]?.length === 0)
              nipFilters = { nip: { [DBConditions.includes]: [] } }
          }

          handleFiltersRefetch({ ...rest, ...nipFilters })
        }}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  const prisma = new PrismaClient()
  const [initialClientList, distinctCountryList, distinctCityList] = await Promise.all([
    prisma.client.findMany({ take: 20 }),
    prisma.client.findMany({
      distinct: 'country',
      select: { country: true },
    }),
    prisma.client.findMany({
      distinct: 'city',
      select: { city: true },
    }),
  ])

  prisma.$disconnect()

  return {
    props: {
      initialClientList,
      filterOptions: {
        country: distinctCountryList.map(({ country }) => country),
        city: distinctCityList.map(({ city }) => city),
        type: Object.values(ClientType),
      },
    },
    revalidate: 10,
  }
}

export default App

// TODO:
// pagination
// skeleton: https://chakra-ui.com/docs/feedback/skeleton
// types for variables
