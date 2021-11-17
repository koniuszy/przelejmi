import React, { FC } from 'react'

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Th, Flex, Center, IconButton } from '@chakra-ui/react'

import { SortOrder } from 'src/generated/graphql'

const SortTh: FC<{
  title: string
  onChange: (s: SortOrder) => void
  sortOrder: SortOrder | null | undefined
}> = ({ title, onChange, sortOrder }) => (
  <Th>
    <Flex>
      <Center>{title}</Center>
      <Flex ml="2" direction="column">
        <IconButton
          cursor="pointer"
          size="xxs"
          aria-label="asc"
          colorScheme={sortOrder === SortOrder.Asc ? 'teal' : undefined}
          icon={<TriangleUpIcon />}
          onClick={() => onChange(SortOrder.Asc)}
        />
        <IconButton
          size="xxs"
          aria-label="desc"
          cursor="pointer"
          colorScheme={sortOrder === SortOrder.Desc ? 'teal' : undefined}
          icon={<TriangleDownIcon />}
          onClick={() => onChange(SortOrder.Desc)}
        />
      </Flex>
    </Flex>
  </Th>
)

export default SortTh
