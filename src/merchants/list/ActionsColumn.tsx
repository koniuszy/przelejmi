import React, { FC, useState } from 'react'

import NextLink from 'next/link'

import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Td, Text, Menu, MenuButton, Button, MenuList, MenuItem, useToast } from '@chakra-ui/react'

import { Merchant } from 'prisma/prisma-client'

import { useDeleteMerchantMutation } from 'src/generated/graphql'

import Clipboard from 'src/components/Clipboard'
import Confirmation from 'src/components/Confirmation'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

const ActionsColumn: FC<{
  merchant: Merchant
  onMerchantDelete: (id: number) => void
}> = ({ merchant, onMerchantDelete }) => {
  const toast = useToast()

  const [merchantDeletionId, setMerchantDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)

  const [deleteMerchant, deleteMerchantOptions] = useDeleteMerchantMutation({
    onCompleted({ deletedMerchant }) {
      toast({
        ...successToastContent,
        title: 'Client deleted.',
      })
      setMerchantDeletionId(null)
      onMerchantDelete(deletedMerchant.id)
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  return (
    <Td>
      <Menu closeOnSelect={false} onClose={() => setMerchantDeletionId(null)}>
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
          <NextLink href={`merchants/${merchant.id}`}>
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
            value={merchant.bankAccountEur}
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

          <Confirmation
            confirmText="Delete"
            isLoading={deleteMerchantOptions.loading}
            id={merchant.id === merchantDeletionId ? merchantDeletionId : null}
            onClick={() => deleteMerchant({ variables: { id: merchant.id } })}
            onClose={() => {
              setMerchantDeletionId(null)
              setOpenActionsRowId(null)
            }}
          >
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
          </Confirmation>
        </MenuList>
      </Menu>
    </Td>
  )
}

export default ActionsColumn
