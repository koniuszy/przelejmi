import React, { FC } from 'react'

import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'

import debounce from 'lodash.debounce'

import useConstant from 'src/hooks'
import { DBConditions } from 'src/types'

export type Search =
  | Record<DBConditions.or, Record<string, { contains: any }>[]>
  | Record<string, any>

const searchKeyBlackList = ['__typename', 'type', 'id']

const SearchInput: FC<{
  onSearch(search: Search): void
  keyList: string[]
  prevFilters: Record<string, any>
}> = (props) => {
  const debouncedSearch = useConstant(() =>
    debounce((search: string, prevFilters: Record<string, any>, keyList: string[]) => {
      if (!search) {
        const { OR, ...rest } = prevFilters
        props.onSearch(rest)

        return
      }

      const parsedSearch = {
        [DBConditions.or]: keyList.map((keyListItem) => ({
          [keyListItem]: { [DBConditions.contains]: search },
        })),
      } as Search

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
        onChange={(e) =>
          debouncedSearch(
            e.target.value,
            props.prevFilters,
            props.keyList.filter((listItem) => !searchKeyBlackList.includes(listItem))
          )
        }
      />
    </InputGroup>
  )
}

export default SearchInput
