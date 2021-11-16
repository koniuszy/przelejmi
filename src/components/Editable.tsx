import React, { FC } from 'react'

import {
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
  onSubmit: (value: string) => void
  isDisabled?: boolean
  border?: boolean
}> = ({ defaultValue, onSubmit, border, isDisabled }) => (
  <FieldBox border={border}>
    <ChakraEditable
      isDisabled={isDisabled}
      defaultValue={defaultValue}
      submitOnBlur={false}
      onSubmit={onSubmit}
    >
      <Flex>
        <Center>
          <EditablePreview />
        </Center>
        <EditableInput pl="2" />
      </Flex>
    </ChakraEditable>
  </FieldBox>
)

export default Editable
