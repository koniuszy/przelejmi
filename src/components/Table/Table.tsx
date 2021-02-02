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

import { Merchant, Client } from '@prisma/client'

import {
  PaginatedMerchantListQueryVariables,
  MerchantWhereInput,
  ClientWhereInput,
  MerchantOrderByInput,
  SortOrder,
  ClientOrderByInput,
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

type Item = Client | Merchant

const Table: FC<
  {
    perPage: number
    createHref: string
    totalRecordsCount: number
    emptyListHeading: string
    list: Item[]
    filtersHeaderProps: Omit<TableHeaderProps, 'variables' | 'refetch'>
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
}) => {
  return (
    <>
      <TableHeader {...filtersHeaderProps} variables={variables} refetch={refetch} />
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
                <Button size="lg" mt={5} colorScheme="teal">
                  Create
                </Button>
              </NextLink>
            </>
          )}
        </TableCaption>

        <Thead>
          <Tr>
            {headerList.map((headerListItem) =>
              typeof headerListItem === 'string' ? (
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
              )
            )}
          </Tr>
        </Thead>
        <Tbody>{list.map(rowRender)}</Tbody>
      </ChakraTable>
    </>
  )
}

export default Table
