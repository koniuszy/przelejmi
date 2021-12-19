import React, { FC, ReactElement, useState } from 'react'

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
import SortTh from './SortTh'
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

// failed attempt of generic table
// TODO: remove variables/refetch functions and add callbacks
function Table<Item>({
  filtersHeaderProps: { isLoading, onDrawerChange, ...filtersHeaderProps },
  list,
  createHref,
  perPage,
  totalRecordsCount,
  variables,
  headerList,
  refetch,
  rowRender,
  emptyListHeading,
}: {
  perPage: number
  createHref: string
  totalRecordsCount: number
  emptyListHeading: string
  list: Item[]
  filtersHeaderProps: Omit<TableHeaderProps, 'variables' | 'refetch' | 'searchKeys'>
  headerList: Array<string | { title: string; sortableKey: string }>
  rowRender: (item: Item, index: number) => ReactElement
  refetch: (params) => Promise<any>
  variables: any
}): ReactElement {
  const [isRefetching, setIsRefetching] = useState(false)

  async function handleRefetch(params) {
    setIsRefetching(true)
    await refetch(params)
    setIsRefetching(false)
  }

  return (
    <Box overflow="auto" maxW="100%">
      <TableHeader
        {...filtersHeaderProps}
        isLoading={isLoading || isRefetching}
        searchKeys={Object.keys(list[0] ?? {})}
        variables={variables}
        refetch={handleRefetch}
        onDrawerChange={async (params) => {
          setIsRefetching(true)
          await onDrawerChange(params)
          setIsRefetching(false)
        }}
      />
      <ChakraTable variant="simple">
        <TableCaption>
          {list.length > 0 ? (
            <Pagination
              totalPages={Math.ceil(totalRecordsCount / perPage)}
              currentPage={variables?.skip ? (variables.skip + perPage) / perPage : 1}
              onPageChange={(newPage) => handleRefetch({ skip: (newPage - 1) * perPage })}
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
            {headerList.map((headerListItem, index) => (
              <React.Fragment key={index}>
                {typeof headerListItem === 'string' ? (
                  <Th whiteSpace="nowrap">{headerListItem}</Th>
                ) : (
                  <SortTh
                    title={headerListItem.title}
                    sortOrder={
                      variables?.orderBy ? variables.orderBy[headerListItem.sortableKey] : null
                    }
                    onChange={(sortOrder) =>
                      handleRefetch({ orderBy: { [headerListItem.sortableKey]: sortOrder } })
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
