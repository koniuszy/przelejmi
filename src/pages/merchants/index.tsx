import React, { FC, useState } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'
import NextLink from 'next/link'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
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
} from '@chakra-ui/react'

import { Merchant, PrismaClient } from '@prisma/client'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import {
  useUpdateMerchantMutation,
  PaginatedMerchantListDocument,
  usePaginatedMerchantListQuery,
  useDeleteMerchantMutation,
  PaginatedMerchantListQuery,
} from 'src/generated/graphql'

import Confirmation from 'src/components/Confirmation'
import Table, { EditableCell } from 'src/components/Table'

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

  const [deleteMerchant, deleteMerchantOptions] = useDeleteMerchantMutation({
    onCompleted(response) {
      toast({
        ...successToastContent,
        title: 'Client deleted.',
      })
      setMerchantDeletionId(null)

      const data = deleteMerchantOptions.client.readQuery<PaginatedMerchantListQuery>({
        query: PaginatedMerchantListDocument,
      })

      deleteMerchantOptions.client.writeQuery({
        query: PaginatedMerchantListDocument,
        data: {
          ...data,
          paginatedMerchantList: {
            ...data.paginatedMerchantList,
            list: data.paginatedMerchantList.list.filter(
              (clientListItem) => clientListItem.id !== response.deletedMerchant.id
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

  function handleUpdate(data: Partial<Merchant>, id: number) {
    const [value] = Object.values(data)
    if (value === '' && data.nip !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateMerchant({ variables: { data, id } })
  }

  const merchantList = data?.paginatedMerchantList.list || initialMerchantList
  const totalRecordsCount = data?.paginatedMerchantList.totalCount ?? initialTotalCount

  return (
    <div>
      <Head>
        <title>przelejmi | Merchants</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Table
          emptyListHeading="No merchants yet 🤫"
          createHref="create/merchant"
          perPage={PER_PAGE}
          totalRecordsCount={totalRecordsCount}
          list={merchantList}
          variables={variables}
          refetch={refetch}
          filtersHeaderProps={{
            title: 'Total merchants',
            isEditable,
            filterOptions,
            drawerOptions,
            onEditableToggle: setIsEditable,
          }}
          headerList={[
            `total: ${totalRecordsCount}`,
            { title: 'company', sortableKey: 'companyName' },
            { title: 'issuer', sortableKey: 'issuerName' },
            'email',
            'bank',
            'actions',
          ]}
          rowRender={(item: Merchant, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}.</Td>

              <EditableCell
                defaultValue={item.companyName}
                isDisabled={!isEditable}
                onSubmit={(companyName) => handleUpdate({ companyName }, item.id)}
              />

              <EditableCell
                defaultValue={item.issuerName}
                isDisabled={!isEditable}
                onSubmit={(issuerName) => handleUpdate({ issuerName }, item.id)}
              />

              <EditableCell
                defaultValue={item.email}
                isDisabled={!isEditable}
                onSubmit={(email) => handleUpdate({ email }, item.id)}
              />

              <EditableCell
                defaultValue={item.bankName}
                isDisabled={!isEditable}
                onSubmit={(bankName) => handleUpdate({ bankName }, item.id)}
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
                    <NextLink href={`merchants/${item.id}`}>
                      <MenuItem justifyContent="start" icon={<EditIcon w={3} h={3} />}>
                        Edit
                      </MenuItem>
                    </NextLink>

                    <Confirmation
                      isLoading={deleteMerchantOptions.loading}
                      id={item.id === merchantDeletionId ? merchantDeletionId : null}
                      onClick={() => deleteMerchant({ variables: { id: item.id } })}
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
