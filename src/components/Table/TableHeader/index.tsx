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

import DrawerFilters, { TriggerFiltersButton, Filters } from './DrawerFilters'
import SearchInput, { SearchInputPlaceholder } from './SearchInput'

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
export type TableHeaderProps = {
  title: string
  isEditable: boolean
  filters: Filters
  showSyncingSpinner: boolean
  isFilterButtonActive: boolean
  onEditableToggle: (v: boolean) => void
  onDrawerChange: (newFilters: Filters) => Promise<void>
  onSearch: (v: string) => void
}

const TableHeader: FC<TableHeaderProps> = ({
  title,
  isEditable,
  filters,
  isFilterButtonActive,
  showSyncingSpinner,
  onEditableToggle,
  onDrawerChange,
  onSearch,
}) => {
  const drawerOptions = useDisclosure()

  return (
    <Flex justifyContent="space-between" pb="5">
      <Text fontSize="4xl" textAlign="center">
        {title}
      </Text>

      <Flex>
        {showSyncingSpinner && (
          <Center pr="5">
            <Spinner />
          </Center>
        )}
        <Center pr="5">
          <SearchInput onSearch={onSearch} />
        </Center>

        <Center pr="5">
          <TriggerFiltersButton isActive={isFilterButtonActive} onOpen={drawerOptions.onOpen} />
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
        filters={filters}
        isOpen={drawerOptions.isOpen}
        onClose={drawerOptions.onClose}
        onChange={onDrawerChange}
      />
    </Flex>
  )
}

export default TableHeader
