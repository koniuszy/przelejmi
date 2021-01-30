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

import { useMutation, useQuery } from '@apollo/client'
import { Client, PrismaClient } from '@prisma/client'
import ReactPaginate from 'react-paginate'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import { UPDATE_CLIENT_MUTATION } from 'src/graphql/mutations'
import { CLIENTS_QUERY } from 'src/graphql/queries'
import { ClientType } from 'src/types'

import DeleteClientPopover from 'src/components/Table/DeleteClientPopover'
import DrawerFilters, { TriggerFiltersButton } from 'src/components/Table/DrawerFilters'
import EditableCell from 'src/components/Table/EditableCell'
import SortTh from 'src/components/Table/SortTh'

type Filters = {
  country: string[]
  city: string[]
}

type SSGProps = {
  initialClientList: Client[]
  filters: Filters
}

const App: FC<SSGProps> = ({ initialClientList, filters }) => {
  const toast = useToast()
  const [isEditable, setIsEditable] = useState(false)
  const [clientDeletionId, setClientDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)
  const drawerOptions = useDisclosure()

  const { data, refetch, variables } = useQuery<{ clientList: Client[] }>(CLIENTS_QUERY)

  const [updateClient, updateClientOptions] = useMutation<{ updatedClient: Client }>(
    UPDATE_CLIENT_MUTATION,
    {
      onCompleted(response) {
        toast({ ...successToastContent, title: 'Client updated' })
        updateClientOptions.client.writeQuery({
          query: CLIENTS_QUERY,
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
    }
  )

  const handleUpdate = (data: Partial<Client>, id: number) => {
    const [value] = Object.values(data)
    if (value === '') {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateClient({ variables: { data, id } })
  }

  const clientList = data?.clientList || initialClientList

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
              <TriggerFiltersButton onOpen={drawerOptions.onOpen} />
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
                isAsc={variables?.orderBy?.name === 'asc'}
                isDesc={variables?.orderBy?.name === 'desc'}
                onAsc={() => refetch({ orderBy: { name: 'asc' } })}
                onDesc={() => refetch({ orderBy: { name: 'desc' } })}
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
                <Td>{item.nip ? ClientType.COMPANY : ClientType.PERSON}</Td>
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.nip?.toString()}
                  onSubmit={(nip) => {
                    if (isNaN(Number(nip))) {
                      toast(errorToastContent)
                      toast(warningToastContent)
                      return
                    }
                    handleUpdate({ nip: Number(nip) }, item.id)
                  }}
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
        filters={filters}
        disclosureOptions={drawerOptions}
        onChange={(where) => refetch({ where })}
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
      filters: {
        country: distinctCountryList.map(({ country }) => country),
        city: distinctCityList.map(({ city }) => city),
      },
    },
    revalidate: 10,
  }
}

export default App

// TODO:
// filters
// pagination
// skeleton: https://chakra-ui.com/docs/feedback/skeleton
