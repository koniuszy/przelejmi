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
  useToast,
} from '@chakra-ui/react'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  useDeleteClientMutation,
  PaginatedClientListDocument,
  PaginatedClientListQuery,
} from 'src/generated/graphql'

const DeletePopover = ({
  id,
  children,
  onClose,
}: PropsWithChildren<{
  id: number | null
  onClose(): void
}>): ReactElement => {
  const toast = useToast()
  const [deleteClient, { loading }] = useDeleteClientMutation({
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Client deleted.',
      })
      onClose()
    },
    onError() {
      toast(errorToastContent)
    },
  })

  function handleDelete() {
    deleteClient({
      variables: { id },
      optimisticResponse: {
        deletedClient: {
          id,
        },
      },
      update(cache, { data: { deletedClient } }) {
        const data = cache.readQuery<PaginatedClientListQuery>({
          query: PaginatedClientListDocument,
        })

        cache.writeQuery({
          query: PaginatedClientListDocument,
          data: {
            ...data,
            paginatedClientList: {
              ...data.paginatedClientList,
              list: data.paginatedClientList.list.filter(
                (clientListItem) => clientListItem.id !== deletedClient.id
              ),
            },
          },
        })
      },
    })
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
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={loading} color="red.400" onClick={handleDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default DeletePopover
