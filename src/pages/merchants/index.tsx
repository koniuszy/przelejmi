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

import { Merchant } from 'prisma/prisma-client'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import {
  useUpdateMerchantMutation,
  PaginatedMerchantListDocument,
  usePaginatedMerchantListQuery,
  useDeleteMerchantMutation,
} from 'src/generated/graphql'

import Clipboard from 'src/components/Clipboard'
import Confirmation from 'src/components/Confirmation'
import Editable from 'src/components/Editable'
import Table from 'src/components/Table'

export const PER_PAGE = 10

const App: FC = () => {
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
        variables,
        data: {
          ...data,
          paginatedMerchantList: {
            ...data.paginatedMerchantList,
            list: data.paginatedMerchantList.list.map((item) =>
              item.id === response.updatedMerchant.id ? response.updatedMerchant : item
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

  const [deleteMerchant, deleteMerchantOptions] = useDeleteMerchantMutation({
    onCompleted(response) {
      toast({
        ...successToastContent,
        title: 'Client deleted.',
      })
      setMerchantDeletionId(null)

      deleteMerchantOptions.client.writeQuery({
        query: PaginatedMerchantListDocument,
        variables,
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
    if (value === '' && data.VATId !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateMerchant({ variables: { data, id } })
  }

  if (!data) return <Spinner />

  const {
    list: merchantList,
    totalCount,
    filters: { countryList, cityList },
  } = data.paginatedMerchantList

  return (
    <div>
      <Head>
        <title>Merchants | przelejmi</title>
      </Head>

      <main>
        <Table
          emptyListHeading="No merchants yet 🤫"
          createHref="merchants/create"
          perPage={PER_PAGE}
          totalRecordsCount={totalCount}
          list={merchantList}
          variables={variables}
          refetch={refetch}
          filtersHeaderProps={{
            title: 'Total merchants',
            isEditable,
            filterOptions: { countryList, cityList },
            drawerOptions,
            onEditableToggle: setIsEditable,
          }}
          headerList={[
            `total: ${totalCount}`,
            { title: 'company', sortableKey: 'companyName' },
            { title: 'issuer', sortableKey: 'issuerName' },
            'email',
            'bank',
            'actions',
          ]}
          rowRender={(item: Merchant, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}.</Td>
              <Td>
                <Editable
                  defaultValue={item.companyName}
                  isDisabled={!isEditable}
                  onSubmit={(companyName) => handleUpdate({ companyName }, item.id)}
                />
              </Td>
              <Td>
                <Editable
                  defaultValue={item.issuerName}
                  isDisabled={!isEditable}
                  onSubmit={(issuerName) => handleUpdate({ issuerName }, item.id)}
                />
              </Td>
              <Td>
                <Editable
                  defaultValue={item.email}
                  isDisabled={!isEditable}
                  onSubmit={(email) => handleUpdate({ email }, item.id)}
                />
              </Td>
              <Td>
                <Editable
                  defaultValue={item.bankName}
                  isDisabled={!isEditable}
                  onSubmit={(bankName) => handleUpdate({ bankName }, item.id)}
                />
              </Td>

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

                    <Clipboard
                      value={item.bankAccountPln}
                      onCopy={() =>
                        toast({
                          ...successToastContent,
                          title: 'Saved in clipboard',
                          description: `bank account pln: ${item.bankAccountPln}`,
                        })
                      }
                    >
                      <MenuItem icon={<CopyIcon w={3} h={3} />}>
                        <Text>Copy bank account PLN</Text>
                      </MenuItem>
                    </Clipboard>

                    <Clipboard
                      value={item.bankAccountEur}
                      onCopy={() =>
                        toast({
                          ...successToastContent,
                          title: 'Saved in clipboard',
                          description: `bank account eur: ${item.bankAccountEur}`,
                        })
                      }
                    >
                      <MenuItem icon={<CopyIcon w={3} h={3} />}>
                        <Text>Copy bank account EUR</Text>
                      </MenuItem>
                    </Clipboard>

                    <Confirmation
                      confirmText="delete"
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
export default App
