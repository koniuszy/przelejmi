import React, { FC } from 'react'

import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'

import { FilterOption } from 'src/types'

const SearchInput: FC<{ onSearch(search): void }> = ({ onSearch }) => (
  <InputGroup>
    <InputRightElement pointerEvents="none" children={<Search2Icon />} />
    <Input type="tel" placeholder="Phone number" />
  </InputGroup>
)

export default SearchInput
