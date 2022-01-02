import React, { FC, ReactElement } from 'react'

import NextLink from 'next/link'

import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Button,
  Heading,
  Stack,
  Skeleton,
  Box,
} from '@chakra-ui/react'

import { Order_By } from 'src/generated/hasura'

import Pagination from './Pagination'
import SortTh from './SortTh'
import TableHeader, { TableHeaderPlaceholder, TableHeaderProps } from './TableHeader'

export type { Filters } from './TableHeader/DrawerFilters'

export const TablePlaceholder: FC<{ title: string }> = ({ title }) => (
  <>
    <TableHeaderPlaceholder title={title} />
    <Stack>
      <Skeleton mt={4} mb={2} height="27px" />
      {new Array(8).fill(null).map((_, index) => (
        <Skeleton key={index} height="67px" />
      ))}
    </Stack>
  </>
)

function Table<Item, SortKey extends string>({
  filtersProps,
  list,
  createHref,
  perPage,
  totalRecordsCount,
  columnList,
  emptyListHeading,
  currentPage,
  activeSorts,
  rowRender,
  onPageChange,
  onSortChange,
}: {
  perPage: number
  createHref: string
  totalRecordsCount: number
  emptyListHeading: string
  list: Item[]
  filtersProps: TableHeaderProps
  columnList: { title: string; sortKey?: SortKey }[]
  currentPage: number
  activeSorts: Partial<Record<SortKey, Order_By>>
  onSortChange: (args: { sortBy: SortKey; sortDirection: Order_By }) => void
  rowRender: (item: Item, index: number) => ReactElement
  onPageChange: (page: number) => void
}): ReactElement {
  return (
    <Box overflow="auto" maxW="100%">
      <TableHeader {...filtersProps} />
      <ChakraTable variant="simple">
        <TableCaption>
          {list.length > 0 ? (
            <Pagination
              totalPages={Math.ceil(totalRecordsCount / perPage)}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          ) : (
            <>
              <Heading as="h2">{emptyListHeading}</Heading>
              <NextLink href={createHref}>
                <Button mt={5} colorScheme="teal">
                  Create
                </Button>
              </NextLink>
            </>
          )}
        </TableCaption>

        <Thead>
          <Tr>
            {columnList.map((columnListItem, index) => (
              <React.Fragment key={index}>
                {columnListItem.sortKey ? (
                  <SortTh
                    title={columnListItem.title}
                    sortOrder={activeSorts[columnListItem.sortKey] || null}
                    onChange={(sortDirection) =>
                      onSortChange({ sortBy: columnListItem.sortKey as SortKey, sortDirection })
                    }
                  />
                ) : (
                  <Th whiteSpace="nowrap">{columnListItem.title}</Th>
                )}
              </React.Fragment>
            ))}
          </Tr>
        </Thead>
        <Tbody>{list.map(rowRender)}</Tbody>
      </ChakraTable>
    </Box>
  )
}

export default Table
