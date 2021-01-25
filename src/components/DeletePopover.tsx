import React, { FC } from 'react'

import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'

const DelePopover: FC<{
  id: string
  onClose(): void
}> = ({ id, children, onClose }) => (
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
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverBody>Are you sure?</PopoverBody>
      <PopoverFooter w="100%">
        <ButtonGroup d="flex" justifyContent="space-between" size="sm">
          <Button variant="outline">Cancel</Button>
          <Button color="red.400">Delete</Button>
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  </Popover>
)

export default DelePopover
