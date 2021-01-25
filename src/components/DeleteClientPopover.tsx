import React, { FC } from 'react'

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

const DELETE_CLIENT_MUTATION = gql`
  mutation deleteOneClient($id: String!) {
    deleteOneClient(where: { id: $id }) {
      id
    }
  }
`

const DelePopover: FC<{
  id: string
  onClose(): void
}> = ({ id, children, onClose }) => {
  const [deleteClient, { loading }] = useMutation(DELETE_CLIENT_MUTATION)

  async function handleDelete() {
    await deleteClient({ variables: { id } })
    onClose()
  }

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
            <Button variant="outline">Cancel</Button>
            <Button isLoading={loading} onDelete={handleDelete} color="red.400">
              Delete
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default DelePopover
