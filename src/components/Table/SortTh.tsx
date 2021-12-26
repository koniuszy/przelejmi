import React, { FC } from 'react'

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Th, Flex, Center, IconButton } from '@chakra-ui/react'

import { Order_By } from 'src/generated/hasura'

const SortTh: FC<{
  title: string
  onChange: (s: Order_By) => void
  sortOrder: Order_By | null
}> = ({ title, onChange, sortOrder }) => (
  <Th>
    <Flex>
      <Center>{title}</Center>
      <Flex ml="2" direction="column">
        <IconButton
          cursor="pointer"
          size="xxs"
          aria-label="asc"
          borderRadius="50%"
          padding={0.5}
          colorScheme={sortOrder === 'asc' ? 'teal' : undefined}
          icon={<TriangleUpIcon />}
          onClick={() => onChange(Order_By.Asc)}
        />
        <IconButton
          size="xxs"
          aria-label="desc"
          cursor="pointer"
          padding={0.5}
          borderRadius="50%"
          colorScheme={sortOrder === 'desc' ? 'teal' : undefined}
          icon={<TriangleDownIcon />}
          onClick={() => onChange(Order_By.Desc)}
        />
      </Flex>
    </Flex>
  </Th>
)

export default SortTh
