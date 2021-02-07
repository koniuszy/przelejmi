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

import TableHeader, { TableHeaderProps } from './Header'
import Pagination from './Pagination'
import SortTh from './SortTh'

export interface Props {
  refetch({
    where,
    skip,
    orderBy,
  }: {
    where?: MerchantWhereInput | ClientWhereInput
    skip?: number
    orderBy?:
      | MerchantOrderByInput
      | MerchantOrderByInput[]
      | ClientOrderByInput
      | ClientOrderByInput[]
  }): void
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
    rowRender(item: Item, index: number): ReactElement
  } & Props
> = ({
  filtersHeaderProps,
  list,
  createHref,
  perPage,
  totalRecordsCount,
  variables,
  headerList,
  refetch,
  rowRender,
  emptyListHeading,
}) => (
  <>
    <TableHeader
      {...filtersHeaderProps}
      searchKeys={Object.keys(list[0] ?? {})}
      variables={variables}
      refetch={refetch}
    />
    <ChakraTable variant="simple">
      <TableCaption>
        {list.length > 0 ? (
          <Pagination
            totalPages={Math.ceil(totalRecordsCount / perPage)}
            currentPage={variables.skip ? (variables.skip + perPage) / perPage : 1}
            onPageChange={(newPage) => refetch({ skip: (newPage - 1) * perPage })}
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
                  isDesc={(variables.orderBy ?? {})[headerListItem.sortableKey] === SortOrder.Desc}
                  onAsc={() =>
                    refetch({ orderBy: { [headerListItem.sortableKey]: SortOrder.Asc } })
                  }
                  onDesc={() =>
                    refetch({ orderBy: { [headerListItem.sortableKey]: SortOrder.Desc } })
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

export default Table
