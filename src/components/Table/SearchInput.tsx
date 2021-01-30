import React, { FC } from 'react'

import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'

import debounce from 'lodash.debounce'

import useConstant from 'src/hooks'
import { DBConditions } from 'src/types'

type Search = Record<DBConditions.or, Record<string, { contains: any }>[]>

const SearchInput: FC<{
  onSearch(search: Search): void
  keyList: string[]
}> = ({ onSearch, keyList }) => {
  const debouncedSearch = useConstant(() =>
    debounce((search) => {
      const parsedSearch = keyList.map((keyListItem) => ({
        [keyListItem]: { [DBConditions.contains]: search },
      }))

      onSearch({ [DBConditions.or]: parsedSearch } as Search)
    }, 100)
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
