import React, { FC, useState } from 'react'

import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'

import debounce from 'lodash.debounce'

export const SearchInputPlaceholder: FC = () => (
  <InputGroup>
    <InputRightElement pointerEvents="none">
      <Search2Icon />
    </InputRightElement>
    <Input readOnly placeholder="Search" />
  </InputGroup>
)

const SearchInput: FC<{
  onSearch: (search: string) => void
}> = (props) => {
  const [debouncedSearch] = useState(() =>
    debounce((search: string) => props.onSearch(search), 300)
  )

  return (
    <InputGroup>
      <InputRightElement pointerEvents="none">
        <Search2Icon />
      </InputRightElement>
      <Input placeholder="Search" onChange={(e) => debouncedSearch(e.target.value)} />
    </InputGroup>
  )
}

export default SearchInput
