import React, { FC } from 'react'

import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'

import debounce from 'lodash.debounce'

import useConstant from 'src/hooks'
import { DBConditions } from 'src/types'

export type Search = Record<DBConditions.or, Record<string, { contains: any }>[]> | null

const SearchInput: FC<{
  onSearch(search: Search): void
  keyList: string[]
  prevFilters: Record<string, any>
}> = ({ onSearch, keyList, prevFilters }) => {
  const debouncedSearch = useConstant(() =>
    debounce((search, prevFilters) => {
      if (!search) {
        onSearch(null)

        return
      }

      const parsedSearch = {
        [DBConditions.or]: keyList.map((keyListItem) => ({
          [keyListItem]: { [DBConditions.contains]: search },
        })),
      } as Search

      onSearch({ ...prevFilters, ...parsedSearch })
    }, 300)
  )

  return (
    <InputGroup>
      <InputRightElement pointerEvents="none">
        <Search2Icon />
      </InputRightElement>
      <Input placeholder="Search" onChange={(e) => debouncedSearch(e.target.value, prevFilters)} />
    </InputGroup>
  )
}

export default SearchInput
