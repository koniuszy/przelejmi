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

import { Merchant, PrismaClient } from '@prisma/client'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import {
  useUpdateMerchantMutation,
  PaginatedMerchantListDocument,
  MerchantOrderByInput,
  SortOrder,
  usePaginatedMerchantListQuery,
} from 'src/generated/graphql'
import { ClientType } from 'src/types'

import DeleteClientPopover from 'src/components/Table/DeleteClientPopover'
import EditableCell from 'src/components/Table/EditableCell'
import TableHeader from 'src/components/Table/Header'
import Pagination from 'src/components/Table/Pagination'
import SortTh from 'src/components/Table/SortTh'

type FilterOptions = {
  country: string[]
  city: string[]
}

type SSGProps = {
  initialMerchantList: Merchant[]
  filterOptions: FilterOptions
  initialTotalCount: number
}

export const PER_PAGE = 10

const App: FC<SSGProps> = ({ initialMerchantList, filterOptions, initialTotalCount }) => {
  const toast = useToast()
  const [isEditable, setIsEditable] = useState(false)
  const [merchantDeletionId, setMerchantDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)
  const drawerOptions = useDisclosure()

  const { data, refetch, variables } = usePaginatedMerchantListQuery({
    variables: { skip: 0, take: PER_PAGE },
  })

  const [updateMerchant, updateMerchantOptions] = useUpdateMerchantMutation({
    onCompleted(response) {
      toast({ ...successToastContent, title: 'Merchant updated' })
      updateMerchantOptions.client.writeQuery({
        query: PaginatedMerchantListDocument,
        data: {
          ...data,
          merchantList: data.paginatedMerchantList.list.map((item) =>
            item.id === response.updatedMerchant.id ? response.updatedMerchant : item
          ),
        },
      })
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(data: Partial<Merchant>, id: number) {
    const [value] = Object.values(data)
    if (value === '' && data.nip !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateMerchant({ variables: { data, id } })
  }

  const merchantList = (data?.paginatedMerchantList.list || initialMerchantList) as Merchant[]
  const orderBy = (variables.orderBy ?? {}) as MerchantOrderByInput
  const totalRecordsCount = data?.paginatedMerchantList.totalCount ?? initialTotalCount

  return (
    <div>
      <Head>
        <title>przelejmi | Merchants</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TableHeader
          title="Total merchants"
          searchKeys={['name', 'nip', 'address', 'postCode', 'city', 'country']}
          variables={variables}
          isEditable={isEditable}
          filterOptions={filterOptions}
          drawerOptions={drawerOptions}
          refetch={refetch}
          onEditableToggle={setIsEditable}
        />

        <Table variant="simple">
          <TableCaption>
            {merchantList.length > 0 ? (
              <Pagination
                totalPages={Math.ceil(totalRecordsCount / PER_PAGE)}
                currentPage={variables.skip ? (variables.skip + PER_PAGE) / PER_PAGE : 1}
                onPageChange={(newPage) => refetch({ skip: (newPage - 1) * PER_PAGE })}
              />
            ) : (
              <>
                <Heading as="h2">No merchants yet 🤫</Heading>
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
                isAsc={orderBy.companyName === 'asc'}
                isDesc={orderBy.companyName === 'desc'}
                onAsc={() => refetch({ orderBy: { companyName: SortOrder.Asc } })}
                onDesc={() => refetch({ orderBy: { companyName: SortOrder.Desc } })}
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
            {merchantList.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}.</Td>
                <EditableCell
                  defaultValue={item.companyName}
                  isDisabled={!isEditable}
                  onSubmit={(companyName) => handleUpdate({ companyName }, item.id)}
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
                  <Menu closeOnSelect={false} onClose={() => setMerchantDeletionId(null)}>
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
                      <NextLink href={`merchant/${item.id}`}>
                        <MenuItem justifyContent="start" icon={<EditIcon w={3} h={3} />}>
                          Edit
                        </MenuItem>
                      </NextLink>

                      <DeleteClientPopover
                        id={item.id === merchantDeletionId ? merchantDeletionId : null}
                        onClose={() => {
                          setMerchantDeletionId(null)
                          setOpenActionsRowId(null)
                        }}
                      >
                        <MenuItem
                          bg="red.500"
                          py="0.4rem"
                          px="0.8rem"
                          _focus={{ bg: 'red.400' }}
                          icon={<DeleteIcon w={3} h={3} />}
                          onClick={() => setMerchantDeletionId(item.id)}
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
    initialMerchantList,
    distinctCountryList,
    distinctCityList,
    initialTotalCount,
  ] = await Promise.all([
    prisma.merchant.findMany({ take: PER_PAGE }),
    prisma.merchant.findMany({
      distinct: 'country',
      select: { country: true },
    }),
    prisma.merchant.findMany({
      distinct: 'city',
      select: { city: true },
    }),
    prisma.merchant.count(),
  ])

  prisma.$disconnect()

  return {
    props: {
      initialMerchantList,
      initialTotalCount,
      filterOptions: {
        country: distinctCountryList.map(({ country }) => country),
        city: distinctCityList.map(({ city }) => city),
      },
    },
    revalidate: 10,
  }
}

export default App
