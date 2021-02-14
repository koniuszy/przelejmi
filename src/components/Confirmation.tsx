import React, { FC, isValidElement } from 'react'

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
  Text,
} from '@chakra-ui/react'

const Confirmation: FC<{
  id: number | null
  onClose(): void
  onClick(): void
  isLoading: boolean
  confirmText: string
}> = ({ id, children, onClose, onClick, isLoading, confirmText }) => {
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
            <Button color="red" isLoading={isLoading} onClick={onClick}>
              <Text>{confirmText}</Text>
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default Confirmation
