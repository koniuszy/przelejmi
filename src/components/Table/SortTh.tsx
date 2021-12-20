import React, { FC } from 'react'

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Th, Flex, Center, IconButton } from '@chakra-ui/react'

export type SortDirection = 'asc' | 'desc'

const SortTh: FC<{
  title: string
  onChange: (s: SortDirection) => void
  sortOrder: SortDirection | null
}> = ({ title, onChange, sortOrder }) => (
  <Th>
    <Flex>
      <Center>{title}</Center>
      <Flex ml="2" direction="column">
        <IconButton
          cursor="pointer"
          size="xxs"
          aria-label="asc"
          colorScheme={sortOrder === 'asc' ? 'teal' : undefined}
          icon={<TriangleUpIcon />}
          onClick={() => onChange('asc')}
        />
        <IconButton
          size="xxs"
          aria-label="desc"
          cursor="pointer"
          colorScheme={sortOrder === 'desc' ? 'teal' : undefined}
          icon={<TriangleDownIcon />}
          onClick={() => onChange('desc')}
        />
      </Flex>
    </Flex>
  </Th>
)

export default SortTh
