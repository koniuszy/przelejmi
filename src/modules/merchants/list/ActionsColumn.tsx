import React, { FC, useState } from 'react'

import NextLink from 'next/link'

import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Td,
  Text,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useToast,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'

import { PaginatedMerchantListQuery, useDeleteMerchantMutation } from 'src/generated/graphql'

import Clipboard from 'src/components/Clipboard'
import ConfirmationPopup from 'src/components/ConfirmationPopup'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

const ActionsColumn: FC<{
  merchant: PaginatedMerchantListQuery['merchantList'][number]
  onMerchantDelete: (id: number) => void
}> = ({ merchant, onMerchantDelete }) => {
  const toast = useToast()

  const [merchantDeletionId, setMerchantDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)

  const [deleteMerchant, deleteMerchantOptions] = useDeleteMerchantMutation({
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Client deleted.',
      })
      setMerchantDeletionId(null)
      onMerchantDelete(merchant.id)
    },
    onError(err) {
      console.error(err)
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
          onClick={() => setOpenActionsRowId(openActionsRowId === merchant.id ? null : merchant.id)}
        >
          …
        </MenuButton>
        <MenuList>
          <NextLink prefetch={false} href={`merchants/${merchant.id}`}>
            <MenuItem justifyContent="start" icon={<EditIcon w={3} h={3} />}>
              Edit
            </MenuItem>
          </NextLink>

          <Clipboard
            value={merchant.bankAccountPln}
            onCopy={() =>
              toast({
                ...successToastContent,
                title: 'Saved in clipboard',
                description: `bank account pln: ${merchant.bankAccountPln}`,
              })
            }
          >
            <MenuItem icon={<CopyIcon w={3} h={3} />}>
              <Text>Copy bank account PLN</Text>
            </MenuItem>
          </Clipboard>

          <Clipboard
            value={merchant.bankAccountEur || ''}
            onCopy={() =>
              toast({
                ...successToastContent,
                title: 'Saved in clipboard',
                description: `bank account eur: ${merchant.bankAccountEur}`,
              })
            }
          >
            <MenuItem icon={<CopyIcon w={3} h={3} />}>
              <Text>Copy bank account EUR</Text>
            </MenuItem>
          </Clipboard>

          <MenuItem
            py="0.4rem"
            px="0.8rem"
            color="red"
            _focus={{ color: 'white', bg: 'red' }}
            icon={<DeleteIcon w={3} h={3} />}
            onClick={() => setMerchantDeletionId(merchant.id)}
          >
            <Text>Delete</Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <ConfirmationPopup
        confirmText="Delete"
        isLoading={deleteMerchantOptions.loading}
        isOpen={merchant.id === merchantDeletionId}
        onConfirm={() => deleteMerchant({ variables: { id: merchant.id } })}
        onClose={() => {
          setMerchantDeletionId(null)
          setOpenActionsRowId(null)
        }}
      >
        <Text>You are going to delete company:</Text>
        <UnorderedList mb={4}>
          <ListItem fontWeight="600">{merchant.companyName}</ListItem>
        </UnorderedList>

        {Boolean(merchant.Scenario.length) && (
          <>
            <Text>You are going to delete scenarios:</Text>
            <UnorderedList>
              {merchant.Scenario.map((i) => (
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

export default ActionsColumn
