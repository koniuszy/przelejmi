import React, { isValidElement, PropsWithChildren, ReactElement } from 'react'

import {
  Button,
  ButtonGroup,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'

import { gql, useMutation } from '@apollo/client'
import { Client } from '@prisma/client'

import { CLIENTS_QUERY } from 'src/pages/clients'

const DELETE_CLIENT_MUTATION = gql`
  mutation deleteOneClient($id: String!) {
    deletedClient: deleteOneClient(where: { id: $id }) {
      id
    }
  }
`

const DeletePopover = ({
  id,
  children,
  onClose,
}: PropsWithChildren<{
  id: string | null
  onClose(): void
}>): ReactElement => {
  const [deleteClient, { loading }] = useMutation(DELETE_CLIENT_MUTATION)

  function handleDelete() {
    deleteClient({
      variables: { id },
      optimisticResponse: {
        deletedClient: {
          id,
        },
      },
      update(proxy, { data: { deletedClient } }) {
        const data = proxy.readQuery<{ clientList: Client[] }>({ query: CLIENTS_QUERY })
        proxy.writeQuery({
          query: CLIENTS_QUERY,
          data: data.clientList.filter((clientListItem) => clientListItem.id !== deletedClient.id),
        })
      },
    }).then(onClose)
  }

  if (!id && isValidElement(children)) return children

  return (
    <Popover
      placement="left"
      closeOnBlur={false}
      returnFocusOnClose={false}
      isOpen={Boolean(id)}
      onClose={onClose}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>Are you sure?</PopoverBody>
        <PopoverFooter w="100%">
          <ButtonGroup d="flex" justifyContent="space-between" size="sm">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button isLoading={loading} onClick={handleDelete} color="red.400">
              Delete
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default DeletePopover
