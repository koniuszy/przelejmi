import React, { FC } from 'react'

import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  ButtonGroup,
  IconButton,
  Editable as ChakraEditable,
  Flex,
  Box,
  Center,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'

const FieldBox: FC<{ border: boolean }> = ({ children, border }) =>
  border ? (
    <Box border="1px" borderColor="gray.700" p="2" borderRadius="lg">
      {children}
    </Box>
  ) : (
    <>{children}</>
  )

const Editable: FC<{
  defaultValue: string
  onSubmit(value: string): void
  isDisabled?: boolean
  border?: boolean
}> = ({ defaultValue, onSubmit, isDisabled, border }) => (
  <FieldBox border={border}>
    <ChakraEditable defaultValue={defaultValue} submitOnBlur={false} onSubmit={onSubmit}>
      {({ isEditing, onSubmit, onCancel, onEdit }) => (
        <Flex>
          {!isDisabled && (
            <Center>
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
            </Center>
          )}

          <Center>
            <EditablePreview />
          </Center>
          <EditableInput pl="2" />
        </Flex>
      )}
    </ChakraEditable>
  </FieldBox>
)

export default Editable
