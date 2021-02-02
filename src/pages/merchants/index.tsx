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
} from 'src/generated/graphql'
import { ClientType } from 'src/types'

import DeleteClientPopover from 'src/components/DeleteClientPopover'
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
          createHref="create/client"
          perPage={PER_PAGE}
          totalRecordsCount={totalRecordsCount}
          list={merchantList}
          variables={variables}
          refetch={refetch}
          filtersHeaderProps={{
            title: 'Total merchants',
            searchKeys: ['name', 'nip', 'address', 'postCode', 'city', 'country'],
            isEditable,
            filterOptions,
            drawerOptions,
            onEditableToggle: setIsEditable,
          }}
          headerList={[
            `total: ${totalRecordsCount}`,
            { title: 'company', sortableKey: 'companyName' },
            'issuer',
            'address',
            'post Code',
            'city',
            'country',
            'email',
            'bank',
            'Pln',
            'Eur',
          ]}
          rowRender={(item: Merchant, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}.</Td>
              {[
                'companyName',
                'issuerName',
                'address',
                'postCode',
                'city',
                'country',
                'email',
                'bankName',
                'bankAccountPln',
                'bankAccountEur',
              ].map((key) => (
                <EditableCell
                  key={key}
                  defaultValue={item[key]}
                  isDisabled={!isEditable}
                  onSubmit={(value) => handleUpdate({ [key]: value }, item.id)}
                />
              ))}

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
