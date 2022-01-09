import React, { FC } from 'react'

import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'

export const SearchInputPlaceholder: FC = () => (
  <InputGroup>
    <InputRightElement pointerEvents="none">
      <Search2Icon />
    </InputRightElement>
    <Input readOnly placeholder="Search" />
  </InputGroup>
)

const SearchInput: FC<{
  search: string
  onSearchChange: (search: string) => void
}> = ({ onSearchChange, search }) => (
  <InputGroup>
    <InputRightElement pointerEvents="none">
      <Search2Icon />
    </InputRightElement>
    <Input value={search} placeholder="Search" onChange={(e) => onSearchChange(e.target.value)} />
  </InputGroup>
)

export default SearchInput
