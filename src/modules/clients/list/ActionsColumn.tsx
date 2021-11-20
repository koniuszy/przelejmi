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
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'

import { PaginatedClientListQuery, useDeleteClientMutation } from 'src/generated/graphql'

import Clipboard from 'src/components/Clipboard'
import ConfirmationPopup from 'src/components/ConfirmationPopup'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

const ActionsColumn: FC<{
  client: PaginatedClientListQuery['clientList'][number]
  onClientDelete: (id: number) => void
}> = ({ client, onClientDelete }) => {
  const toast = useToast()

  const [clientIdToDelete, setClientIdToDelete] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)

  const [deleteClient, deleteClientOptions] = useDeleteClientMutation({
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Client deleted.',
      })
      setClientIdToDelete(null)
      onClientDelete(client.id)
    },
    onError() {
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
          onClick={() => setOpenActionsRowId(openActionsRowId === client.id ? null : client.id)}
        >
          …
        </MenuButton>
        <MenuList>
          <NextLink prefetch={false} href={`clients/${client.id}`}>
            <MenuItem justifyContent="start" icon={<EditIcon w={3} h={3} />}>
              Edit
            </MenuItem>
          </NextLink>

          <Clipboard
            value={client.VATId || ''}
            onCopy={() =>
              toast({
                ...successToastContent,
                title: 'Saved in clipboard',
                description: `VAT ID: ${client.VATId}`,
              })
            }
          >
            <MenuItem isDisabled={!client.VATId} bg="gray.700" icon={<CopyIcon w={3} h={3} />}>
              <Text>Copy VAT ID</Text>
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

          <MenuItem
            py="0.4rem"
            px="0.8rem"
            color="red"
            _focus={{ color: 'white', bg: 'red' }}
            icon={<DeleteIcon w={3} h={3} />}
            onClick={() => setClientIdToDelete(client.id)}
          >
            <Text>Delete</Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <ConfirmationPopup
        confirmText="Delete"
        isLoading={deleteClientOptions.loading}
        isOpen={client.id === clientIdToDelete}
        onConfirm={() => deleteClient({ variables: { id: client.id } })}
        onClose={() => {
          setClientIdToDelete(null)
          setOpenActionsRowId(null)
        }}
      >
        <Text>You are going to delete client:</Text>
        <UnorderedList mb={4}>
          <ListItem fontWeight="600">{client.name}</ListItem>
        </UnorderedList>

        {Boolean(client.Scenario.length) && (
          <>
            <Text>You are going to delete scenarios:</Text>
            <UnorderedList>
              {client.Scenario.map((i) => (
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
