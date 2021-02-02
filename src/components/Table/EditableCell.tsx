import React, { FC } from 'react'

import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  Td,
  Editable,
  EditablePreview,
  EditableInput,
  ButtonGroup,
  IconButton,
  Box,
  Flex,
  Center,
} from '@chakra-ui/react'

const EditableCell: FC<{
  defaultValue: string
  onSubmit(newValue: string): void
  isDisabled: boolean
}> = ({ defaultValue, onSubmit, isDisabled }) => (
  <Td>
    <Editable
      isDisabled={isDisabled}
      defaultValue={defaultValue}
      isPreviewFocusable={false}
      submitOnBlur={false}
      onSubmit={onSubmit}
    >
      {({ isEditing, onSubmit, onCancel, onEdit }) => (
        <Flex>
          {!isDisabled && (
            <Box pr="2">
              {isEditing ? (
                <ButtonGroup justifyContent="center" size="sm">
                  <IconButton
                    colorScheme="green"
                    aria-label="check"
                    icon={<CheckIcon />}
                    onClick={onSubmit}
                  />
                  <IconButton
                    colorScheme="red"
                    aria-label="close"
                    icon={<CloseIcon />}
                    onClick={onCancel}
                  />
                </ButtonGroup>
              ) : (
                <IconButton aria-label="edit" size="xs" icon={<EditIcon />} onClick={onEdit} />
              )}
            </Box>
          )}

          <Center>
            <EditablePreview />
          </Center>
          <EditableInput pl="2" />
        </Flex>
      )}
    </Editable>
  </Td>
)

export default EditableCell
