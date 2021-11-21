import React, { FC, useState } from 'react'

import NextLink from 'next/link'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
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

import { PaginatedInvoiceListQuery, useDeleteInvoiceMutation } from 'src/generated/graphql'

import ConfirmationPopup from 'src/components/ConfirmationPopup'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

const ActionsColumn: FC<{
  invoice: PaginatedInvoiceListQuery['invoiceList'][number]
  onInvoiceDelete: (id: number) => void
}> = ({ invoice, onInvoiceDelete }) => {
  const toast = useToast()

  const [invoiceDeletionId, setInvoiceDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)

  const [deleteInvoice, deleteInvoiceOptions] = useDeleteInvoiceMutation({
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Invoice deleted.',
      })
      setInvoiceDeletionId(null)
      onInvoiceDelete(invoice.id)
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
          onClick={() => setOpenActionsRowId(openActionsRowId === invoice.id ? null : invoice.id)}
        >
          …
        </MenuButton>
        <MenuList>
          <NextLink prefetch={false} href={`invoices/${invoice.id}`}>
            <MenuItem justifyContent="start" icon={<EditIcon w={3} h={3} />}>
              Edit
            </MenuItem>
          </NextLink>

          <MenuItem
            py="0.4rem"
            px="0.8rem"
            color="red"
            _focus={{ color: 'white', bg: 'red' }}
            icon={<DeleteIcon w={3} h={3} />}
            onClick={() => setInvoiceDeletionId(invoice.id)}
          >
            <Text>Delete</Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <ConfirmationPopup
        confirmText="Delete"
        isLoading={deleteInvoiceOptions.loading}
        isOpen={invoice.id === invoiceDeletionId}
        onConfirm={() => deleteInvoice({ variables: { id: invoice.id } })}
        onClose={() => {
          setInvoiceDeletionId(null)
          setOpenActionsRowId(null)
        }}
      >
        <Text>You are going to delete invoice:</Text>
        <UnorderedList mb={4}>
          <ListItem fontWeight="600">{invoice.invoiceNumber}</ListItem>
        </UnorderedList>
      </ConfirmationPopup>
    </Td>
  )
}

export default ActionsColumn
