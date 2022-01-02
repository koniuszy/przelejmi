import React, { FC, useEffect } from 'react'

import { Icon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
  Stack,
} from '@chakra-ui/react'

export const TriggerFiltersButton: FC<{ onOpen: () => void; isActive: boolean }> = ({
  onOpen,
  isActive,
}) => (
  <Button
    size="sm"
    colorScheme={isActive ? 'teal' : 'gray'}
    rightIcon={
      <Icon viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M256 0c-141.385 0-256 35.817-256 80v48l192 192v160c0 17.673 28.653 32 64 32s64-14.327 64-32v-160l192-192v-48c0-44.183-114.615-80-256-80zM47.192 69.412c11.972-6.829 28.791-13.31 48.639-18.744 43.972-12.038 100.854-18.668 160.169-18.668s116.197 6.63 160.169 18.668c19.848 5.434 36.667 11.915 48.64 18.744 7.896 4.503 12.162 8.312 14.148 10.588-1.986 2.276-6.253 6.084-14.148 10.588-11.973 6.829-28.792 13.31-48.64 18.744-43.971 12.038-100.854 18.668-160.169 18.668s-116.197-6.63-160.169-18.668c-19.848-5.434-36.667-11.915-48.639-18.744-7.896-4.504-12.162-8.312-14.149-10.588 1.987-2.276 6.253-6.084 14.149-10.588z"
        />
      </Icon>
    }
    onClick={onOpen}
  >
    Filters
  </Button>
)

const DrawerLayout: FC<{ onReset?: () => void; onClose: () => void; isOpen: boolean }> = ({
  children,
  isOpen,
  onClose,
  onReset,
}) => (
  <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
    <DrawerOverlay>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filters</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>
          <Button disabled={Boolean(onReset)} variant="outline" mr={3} onClick={onReset}>
            Reset
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
)

export type Filters = { title: string; items: { title: string; checked: boolean }[] }[]

const DrawerFilters: FC<{
  isOpen: boolean
  filters: Filters | undefined
  onChange: (f: Filters) => void
  onClose: () => void
  onOpen: () => void
}> = ({ onClose, isOpen, onChange, onOpen, filters }) => {
  useEffect(() => {
    onOpen()
  }, [])

  if (!filters)
    return (
      <DrawerLayout isOpen={isOpen} onClose={onClose}>
        <Spinner />
      </DrawerLayout>
    )

  return (
    <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>
            <Accordion allowMultiple defaultIndex={[0]}>
              {filters.map((i) => (
                <AccordionItem key={i.title}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {i.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <Stack spacing={3}>
                      <Checkbox
                        size="sm"
                        colorScheme="green"
                        isChecked={!i.items.find((item) => item.checked === false)}
                        onChange={(e) =>
                          onChange(
                            filters.map((filterListItem) => ({
                              ...filterListItem,
                              options:
                                filterListItem.title === i.title
                                  ? filterListItem.items.map((optionListItem) => ({
                                      ...optionListItem,
                                      checked: e.target.checked,
                                    }))
                                  : filterListItem.items,
                            }))
                          )
                        }
                      >
                        Select all
                      </Checkbox>

                      {i.items.map((optionListItem) => (
                        <Checkbox
                          size="lg"
                          colorScheme="green"
                          key={optionListItem.title}
                          isChecked={optionListItem.checked}
                          onChange={(e) =>
                            onChange(
                              filters.map((filterListItem) => ({
                                ...filterListItem,
                                options:
                                  filterListItem.title === i.title
                                    ? filterListItem.items.map((item) => ({
                                        ...item,
                                        checked:
                                          item.title === optionListItem.title
                                            ? e.target.checked
                                            : item.checked,
                                      }))
                                    : filterListItem.items,
                              }))
                            )
                          }
                        >
                          {optionListItem.title}
                        </Checkbox>
                      ))}
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                const allChecked = filters.map((i) => ({
                  ...i,
                  options: i.items.map((o) => ({ ...o, checked: true })),
                }))
                onChange(allChecked)
              }}
            >
              Reset
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default DrawerFilters
