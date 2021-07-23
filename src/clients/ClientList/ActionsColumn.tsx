import React, { FC, useState } from 'react'

import NextLink from 'next/link'

import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Td, Text, Menu, MenuButton, Button, MenuList, MenuItem, useToast } from '@chakra-ui/react'

import { Client } from 'prisma/prisma-client'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import { useDeleteClientMutation } from 'src/generated/graphql'

import Clipboard from 'src/components/Clipboard'
import Confirmation from 'src/components/Confirmation'

const ActionsColumn: FC<{ client: Client; onClientDelete(id: number): void }> = ({
  client,
  onClientDelete,
}) => {
  const toast = useToast()

  const [clientDeletionId, setClientDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)

  const [deleteClient, deleteClientOptions] = useDeleteClientMutation({
    onCompleted({ deletedClient }) {
      toast({
        ...successToastContent,
        title: 'Client deleted.',
      })
      setClientDeletionId(null)
      onClientDelete(deletedClient.id)
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  return (
    <Td>
      <Menu closeOnSelect={false} onClose={() => setClientDeletionId(null)}>
        <MenuButton
          as={Button}
          variant="ghost"
          cursor="pointer"
          colorScheme="teal"
          onClick={() => setOpenActionsRowId(openActionsRowId === client.id ? null : client.id)}
        >
          …
        </MenuButton>
        <MenuList>
          <NextLink href={`clients/${client.id}`}>
            <MenuItem justifyContent="start" icon={<EditIcon w={3} h={3} />}>
              Edit
            </MenuItem>
          </NextLink>

          <Clipboard
            value={client.VATId}
            onCopy={() =>
              toast({
                ...successToastContent,
                title: 'Saved in clipboard',
                description: `VAT id: ${client.VATId}`,
              })
            }
          >
            <MenuItem isDisabled={!client.VATId} bg="gray.700" icon={<CopyIcon w={3} h={3} />}>
              <Text>Copy VAT id</Text>
            </MenuItem>
          </Clipboard>

          <Clipboard
            value={client.address}
            onCopy={() =>
              toast({
                ...successToastContent,
                title: 'Saved in clipboard',
                description: `Address: ${client.address}`,
              })
            }
          >
            <MenuItem icon={<CopyIcon w={3} h={3} />}>
              <Text>Copy address</Text>
            </MenuItem>
          </Clipboard>

          <Confirmation
            confirmText="Delete"
            isLoading={deleteClientOptions.loading}
            id={client.id === clientDeletionId ? clientDeletionId : null}
            onClick={() => deleteClient({ variables: { id: client.id } })}
            onClose={() => {
              setClientDeletionId(null)
              setOpenActionsRowId(null)
            }}
          >
            <MenuItem
              py="0.4rem"
              px="0.8rem"
              color="red"
              _focus={{ color: 'white', bg: 'red' }}
              icon={<DeleteIcon w={3} h={3} />}
              onClick={() => setClientDeletionId(client.id)}
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
