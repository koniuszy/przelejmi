import React, { FC } from 'react'

import { Text, Flex, Center, Switch, FormControl, FormLabel } from '@chakra-ui/react'

import {
  ClientWhereInput,
  MerchantWhereInput,
  PaginatedMerchantListQueryVariables,
} from 'src/generated/graphql'

import DrawerFilters, { TriggerFiltersButton, Filters } from './DrawerFilters'
import SearchInput, { Search } from './SearchInput'

const TableHeader: FC<{
  title: string
  isEditable: boolean
  searchKeys: string[]
  variables: PaginatedMerchantListQueryVariables
  drawerOptions: { onClose(): void; isOpen: boolean; onOpen(): void }
  filterOptions: Record<string, string[]>
  onEditableToggle(v: boolean): void
  refetch({ where }: { where: MerchantWhereInput | ClientWhereInput }): void
  onDrawerChange?(newFilters: Filters): void
}> = ({
  title,
  variables,
  isEditable,
  drawerOptions,
  filterOptions,
  searchKeys,
  refetch,
  onEditableToggle,
  onDrawerChange,
}) => {
  function handleFiltersRefetch(filters: Search | Filters) {
    refetch({ where: filters })
  }
  return (
    <Flex justifyContent="space-between" pb="5">
      <Text fontSize="4xl" textAlign="center">
        {title}
      </Text>

      <Flex>
        <Center pr="5">
          <SearchInput
            keyList={searchKeys}
            prevFilters={variables.where}
            onSearch={handleFiltersRefetch}
          />
        </Center>

        <Center pr="5">
          <TriggerFiltersButton
            isActive={
              variables.where &&
              Object.keys(variables.where).length > 0 &&
              !Object.keys(variables.where).includes('OR')
            }
            onOpen={drawerOptions.onOpen}
          />
        </Center>

        <Center>
          <FormControl id="editable" display="flex" alignItems="center">
            <FormLabel htmlFor="editable" mb="0">
              Editable
            </FormLabel>
            <Switch
              size="lg"
              colorScheme="teal"
              defaultChecked={isEditable}
              onChange={(e) => onEditableToggle(e.target.checked)}
            />
          </FormControl>
        </Center>
      </Flex>

      <DrawerFilters
        filters={filterOptions}
        disclosureOptions={drawerOptions}
        prevFilters={variables.where}
        onChange={onDrawerChange ?? handleFiltersRefetch}
      />
    </Flex>
  )
}

export default TableHeader
