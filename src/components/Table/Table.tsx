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
} from '@chakra-ui/react'

import {
  PaginatedMerchantListQueryVariables,
  MerchantWhereInput,
  ClientWhereInput,
  MerchantOrderByInput,
  SortOrder,
  ClientOrderByInput,
  ClientContentFragment,
  MerchantContentFragment,
} from 'src/generated/graphql'

import Pagination from './Pagination'
import SortTh from './SortTh'
import TableHeader from './TableHeader'
import { TableHeaderProps, TableHeaderPlaceholder } from './TableHeader/TableHeader'

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

type RefetchParams = {
  where?: MerchantWhereInput | ClientWhereInput
  skip?: number
  orderBy?:
    | MerchantOrderByInput
    | MerchantOrderByInput[]
    | ClientOrderByInput
    | ClientOrderByInput[]
}
export type Props = {
  refetch: (params: RefetchParams) => Promise<any>
  variables: PaginatedMerchantListQueryVariables
}

type Item = ClientContentFragment | MerchantContentFragment

const Table: FC<
  {
    perPage: number
    createHref: string
    totalRecordsCount: number
    emptyListHeading: string
    list: Item[]
    filtersHeaderProps: Omit<TableHeaderProps, 'variables' | 'refetch' | 'searchKeys'>
    headerList: Array<string | { title: string; sortableKey: string }>
    rowRender: (item: Item, index: number) => ReactElement
  } & Props
> = ({
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
}) => {
  const [isRefetching, setIsRefetching] = useState(false)

  async function handleRefetch(params: RefetchParams) {
    setIsRefetching(true)
    await refetch(params)
    setIsRefetching(false)
  }

  return (
    <>
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
              currentPage={variables.skip ? (variables.skip + perPage) / perPage : 1}
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
                  <Th>{headerListItem}</Th>
                ) : (
                  <SortTh
                    title={headerListItem.title}
                    isAsc={(variables.orderBy ?? {})[headerListItem.sortableKey] === SortOrder.Asc}
                    isDesc={
                      (variables.orderBy ?? {})[headerListItem.sortableKey] === SortOrder.Desc
                    }
                    onAsc={() =>
                      handleRefetch({ orderBy: { [headerListItem.sortableKey]: SortOrder.Asc } })
                    }
                    onDesc={() =>
                      handleRefetch({ orderBy: { [headerListItem.sortableKey]: SortOrder.Desc } })
                    }
                  />
                )}
              </React.Fragment>
            ))}
          </Tr>
        </Thead>
        <Tbody>{list.map(rowRender)}</Tbody>
      </ChakraTable>
    </>
  )
}

export default Table
