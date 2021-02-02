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
  useToast,
  Heading,
  useDisclosure,
} from '@chakra-ui/react'

import { Client, PrismaClient } from '@prisma/client'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import {
  useUpdateClientMutation,
  PaginatedClientListDocument,
  ClientOrderByInput,
  SortOrder,
  usePaginatedClientListQuery,
} from 'src/generated/graphql'
import { ClientType, DBConditions } from 'src/types'

import DeleteClientPopover from 'src/components/Table/DeleteClientPopover'
import EditableCell from 'src/components/Table/EditableCell'
import TableHeader from 'src/components/Table/Header'
import Pagination from 'src/components/Table/Pagination'
import SortTh from 'src/components/Table/SortTh'

type FilterOptions = {
  country: string[]
  city: string[]
  type: ClientType[]
}

type SSGProps = {
  initialClientList: Client[]
  filterOptions: FilterOptions
  initialTotalCount: number
}

export const PER_PAGE = 10

const App: FC<SSGProps> = ({ initialClientList, filterOptions, initialTotalCount }) => {
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
        data: {
          ...data,
          clientList: data.paginatedClientList.list.map((item) =>
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
    if (value === '' && data.nip !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateClient({ variables: { data, id } })
  }

  const clientList = (data?.paginatedClientList.list || initialClientList) as Client[]
  const orderBy = (variables.orderBy ?? {}) as ClientOrderByInput
  const totalRecordsCount = data?.paginatedClientList.totalCount ?? initialTotalCount

  return (
    <div>
      <Head>
        <title>przelejmi | Clients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TableHeader
          title="Total clients"
          searchKeys={['name', 'nip', 'address', 'postCode', 'city', 'country']}
          variables={variables}
          isEditable={isEditable}
          filterOptions={filterOptions}
          drawerOptions={drawerOptions}
          refetch={refetch}
          onEditableToggle={setIsEditable}
          onDrawerChange={(newFilters) => {
            if (!newFilters) {
              refetch({ where: newFilters })
              return
            }

            const { type, ...rest } = newFilters
            let nipFilters = {}
            if (type) {
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

            refetch({ where: { ...rest, ...nipFilters } })
          }}
        />

        <Table variant="simple">
          <TableCaption>
            {clientList.length > 0 ? (
              <Pagination
                totalPages={Math.ceil(totalRecordsCount / PER_PAGE)}
                currentPage={variables.skip ? (variables.skip + PER_PAGE) / PER_PAGE : 1}
                onPageChange={(newPage) => refetch({ skip: (newPage - 1) * PER_PAGE })}
              />
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
              <Th>total: {totalRecordsCount}</Th>
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
    </div>
  )
}

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  const prisma = new PrismaClient()
  const [
    initialClientList,
    distinctCountryList,
    distinctCityList,
    initialTotalCount,
  ] = await Promise.all([
    prisma.client.findMany({ take: PER_PAGE }),
    prisma.client.findMany({
      distinct: 'country',
      select: { country: true },
    }),
    prisma.client.findMany({
      distinct: 'city',
      select: { city: true },
    }),
    prisma.client.count(),
  ])

  prisma.$disconnect()

  return {
    props: {
      initialClientList,
      initialTotalCount,
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
