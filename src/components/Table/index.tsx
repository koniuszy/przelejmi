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

import Pagination from './Pagination'
import SortTh, { SortDirection } from './SortTh'
import TableHeader, { TableHeaderPlaceholder, TableHeaderProps } from './TableHeader'

export const TablePlaceholder: FC<{ title: string }> = ({ title }) => (
  <>
    <TableHeaderPlaceholder title={title} />
    <Stack>
      <Skeleton mt={4} height="27px" />
      {new Array(6).fill(null).map((_, index) => (
        <Skeleton key={index} height="67px" />
      ))}
    </Stack>
  </>
)

type SimpleColumn = string
type SortableColumn = { title: string; sortKey?: string; sort: SortDirection | null }

export type ColumnListItem = SimpleColumn | SortableColumn

function Table<Item>({
  filtersProps,
  list,
  createHref,
  perPage,
  totalRecordsCount,
  columnList,
  emptyListHeading,
  currentPage,
  rowRender,
  onPageChange,
  onColumnListChange,
}: {
  perPage: number
  createHref: string
  totalRecordsCount: number
  emptyListHeading: string
  list: Item[]
  filtersProps: TableHeaderProps
  columnList: ColumnListItem[]
  currentPage: number
  onColumnListChange: (l: ColumnListItem[]) => void
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
                {typeof columnListItem === 'string' ? (
                  <Th whiteSpace="nowrap">{columnListItem}</Th>
                ) : (
                  <SortTh
                    title={columnListItem.title}
                    sortOrder={columnListItem.sort}
                    onChange={(sort) =>
                      onColumnListChange(
                        columnList.map((i) =>
                          typeof i === 'string'
                            ? i
                            : i.title === columnListItem.title
                            ? { title: columnListItem.title, sort }
                            : i
                        )
                      )
                    }
                  />
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
