import React, { FC, useState } from 'react'

import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'

import debounce from 'lodash.debounce'

import { DBConditions } from 'src/types'

export type Search =
  | Record<DBConditions.or, Record<string, { contains: any }>[]>
  | Record<string, any>

const searchKeyBlackList = ['__typename', 'type', 'id']

export const SearchInputPlaceholder: FC = () => (
  <InputGroup>
    <InputRightElement pointerEvents="none">
      <Search2Icon />
    </InputRightElement>
    <Input readOnly placeholder="Search" />
  </InputGroup>
)

const SearchInput: FC<{
  onSearch: (search: Search) => void
  keyList: string[]
  prevFilters: Record<string, any>
}> = (props) => {
  const [keyList] = useState(
    props.keyList.filter((listItem) => !searchKeyBlackList.includes(listItem))
  )

  const [debouncedSearch] = useState(() =>
    debounce((search: string, prevFilters: Record<string, any>) => {
      if (!search) {
        const { OR, ...rest } = prevFilters ?? {}
        props.onSearch(rest)

        return
      }

      const parsedSearch: Search = {
        [DBConditions.or]: keyList.map((keyListItem) => ({
          [keyListItem]: { [DBConditions.contains]: search, mode: 'insensitive' },
        })),
      }

      props.onSearch({ ...prevFilters, ...parsedSearch })
    }, 300)
  )

  return (
    <InputGroup>
      <InputRightElement pointerEvents="none">
        <Search2Icon />
      </InputRightElement>
      <Input
        placeholder="Search"
        onChange={(e) => {
          debouncedSearch(e.target.value, props.prevFilters)
        }}
      />
    </InputGroup>
  )
}

export default SearchInput
