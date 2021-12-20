import React, { FC, useState } from 'react'

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
  Stack,
} from '@chakra-ui/react'

import debounce from 'lodash.debounce'

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

export type Filters = { name: string; options: { name: string; checked: boolean }[] }[]

const DrawerFilters: FC<{
  isOpen: boolean
  filters: Filters
  onClose: () => void
  onChange: (where: Filters) => void
}> = ({ filters, onClose, isOpen, onChange }) => {
  const [filterList, setFilterList] = useState(filters)

  const [handleDebouncedFiltersChange] = useState(() => debounce(onChange, 200))

  function handleOptionListChange(newFilterList: typeof filterList) {
    setFilterList(newFilterList)
    handleDebouncedFiltersChange(newFilterList)
  }

  return (
    <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>
            <Accordion allowMultiple defaultIndex={[0]}>
              {filterList.map((i) => (
                <AccordionItem key={i.name}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <Stack spacing={3}>
                      <Checkbox
                        size="sm"
                        colorScheme="green"
                        isChecked={!i.options.find((item) => item.checked === false)}
                        onChange={(e) =>
                          handleOptionListChange(
                            filterList.map((filterListItem) => ({
                              ...filterListItem,
                              options:
                                filterListItem.name === i.name
                                  ? filterListItem.options.map((optionListItem) => ({
                                      ...optionListItem,
                                      checked: e.target.checked,
                                    }))
                                  : filterListItem.options,
                            }))
                          )
                        }
                      >
                        Select all
                      </Checkbox>

                      {i.options.map((optionListItem) => (
                        <Checkbox
                          size="lg"
                          colorScheme="green"
                          key={optionListItem.name}
                          isChecked={optionListItem.checked}
                          onChange={(e) =>
                            handleOptionListChange(
                              filterList.map((filterListItem) => ({
                                ...filterListItem,
                                options:
                                  filterListItem.name === i.name
                                    ? filterListItem.options.map((item) => ({
                                        ...item,
                                        checked:
                                          item.name === optionListItem.name
                                            ? e.target.checked
                                            : item.checked,
                                      }))
                                    : filterListItem.options,
                              }))
                            )
                          }
                        >
                          {optionListItem.name}
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
                  options: i.options.map((o) => ({ ...o, checked: true })),
                }))
                onChange(allChecked)
                setFilterList(allChecked)
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
