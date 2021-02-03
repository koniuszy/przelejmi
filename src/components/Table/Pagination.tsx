import React, { FC } from 'react'

import { Button, ButtonGroup, Center } from '@chakra-ui/react'

const pagesCountInBlock = 5

const Pagination: FC<{
  totalPages: number
  currentPage: number
  onPageChange(page: number): void
}> = ({ totalPages, currentPage, onPageChange }) => {
  const moreThan1Block = totalPages > pagesCountInBlock
  const pagesCountInTheLastBlock = totalPages - pagesCountInBlock
  const activeButtonProps = { colorScheme: 'teal', variant: 'solid' }
  return (
    <>
      <Center>
        <ButtonGroup isAttached variant="outline">
          {new Array(moreThan1Block ? pagesCountInBlock : totalPages).fill(null).map((_, index) => {
            const page = index + 1
            const props = page === currentPage ? activeButtonProps : {}
            return (
              <Button w={50} onClick={() => onPageChange(page)} {...props} key={page}>
                {page}
              </Button>
            )
          })}

          {totalPages > pagesCountInBlock * 2 && <Button disabled>…</Button>}

          {moreThan1Block &&
            new Array(
              pagesCountInTheLastBlock > pagesCountInBlock
                ? pagesCountInBlock
                : pagesCountInTheLastBlock
            )
              .fill(null)
              .map((_, index) => {
                const page = totalPages - index
                const props = page === currentPage ? activeButtonProps : {}

                return (
                  <Button w={50} onClick={() => onPageChange(page)} {...props} key={page}>
                    {page}
                  </Button>
                )
              })
              .reverse()}
        </ButtonGroup>
      </Center>
    </>
  )
}

export default Pagination
