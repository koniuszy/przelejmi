import React, { FC } from 'react'

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Th, Flex, Center, IconButton } from '@chakra-ui/react'

const SortTh: FC<{
  title: string
  isAsc: boolean
  isDesc: boolean
  onAsc: () => void
  onDesc: () => void
}> = ({ title, isAsc, isDesc, onAsc, onDesc }) => (
  <Th>
    <Flex>
      <Center>{title}</Center>
      <Flex ml="2" direction="column">
        <IconButton
          cursor="pointer"
          size="xxs"
          aria-label="asc"
          colorScheme={isAsc ? 'teal' : undefined}
          icon={<TriangleUpIcon />}
          onClick={onAsc}
        />
        <IconButton
          size="xxs"
          aria-label="desc"
          cursor="pointer"
          colorScheme={isDesc ? 'teal' : undefined}
          icon={<TriangleDownIcon />}
          onClick={onDesc}
        />
      </Flex>
    </Flex>
  </Th>
)

export default SortTh
