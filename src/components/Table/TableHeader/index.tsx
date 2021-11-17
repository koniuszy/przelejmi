import React, { FC } from 'react'

import {
  Text,
  Flex,
  Center,
  Switch,
  FormControl,
  FormLabel,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'

import { PaginatedMerchantListQueryVariables } from 'src/generated/graphql'

import DrawerFilters, { TriggerFiltersButton, Filters } from './DrawerFilters'
import SearchInput, { Search, SearchInputPlaceholder } from './SearchInput'

export type Variables = Partial<PaginatedMerchantListQueryVariables> | undefined

export type TableHeaderProps = {
  title: string
  isEditable: boolean
  searchKeys: string[]
  filterOptions: Record<string, string[]>
  onEditableToggle: (v: boolean) => void
  isLoading: boolean
  onDrawerChange: (newFilters: Filters) => Promise<void>
}

export const TableHeaderPlaceholder: FC<{ title: string }> = ({ title }) => (
  <Flex justifyContent="space-between" pb="5">
    <Text fontSize="4xl" textAlign="center">
      {title}
    </Text>

    <Flex>
      <Center pr="5">
        <SearchInputPlaceholder />
      </Center>

      <Center pr="5">
        <TriggerFiltersButton isActive={false} onOpen={() => null} />
      </Center>

      <Center>
        <FormControl id="editable" display="flex" alignItems="center">
          <FormLabel htmlFor="editable" mb="0">
            Editable
          </FormLabel>
          <Switch defaultChecked colorScheme="teal" />
        </FormControl>
      </Center>
    </Flex>
  </Flex>
)

const TableHeader: FC<
  TableHeaderProps & { variables: Variables; refetch: (v: Variables) => Promise<any> }
> = ({
  title,
  variables,
  isEditable,
  filterOptions,
  refetch,
  onEditableToggle,
  onDrawerChange,
  searchKeys,
  isLoading,
}) => {
  const drawerOptions = useDisclosure()

  function handleFiltersRefetch(filters: Search | Filters) {
    refetch({ where: filters })
  }

  return (
    <Flex justifyContent="space-between" pb="5">
      <Text fontSize="4xl" textAlign="center">
        {title}
      </Text>

      <Flex>
        {isLoading && (
          <Center pr="5">
            <Spinner />
          </Center>
        )}
        <Center pr="5">
          <SearchInput
            keyList={searchKeys}
            prevFilters={variables?.where || {}}
            onSearch={handleFiltersRefetch}
          />
        </Center>

        <Center pr="5">
          <TriggerFiltersButton
            isActive={Boolean(
              variables?.where &&
                Object.keys(variables?.where).length > 0 &&
                !Object.keys(variables?.where).includes('OR')
            )}
            onOpen={drawerOptions.onOpen}
          />
        </Center>

        <Center>
          <FormControl id="editable" display="flex" alignItems="center">
            <FormLabel htmlFor="editable" mb="0">
              Editable
            </FormLabel>
            <Switch
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
        prevFilters={variables?.where || {}}
        onChange={onDrawerChange}
      />
    </Flex>
  )
}

export default TableHeader
