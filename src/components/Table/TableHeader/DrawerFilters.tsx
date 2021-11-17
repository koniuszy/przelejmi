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

import { DBConditions } from 'src/types'

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

export type Filters = any | null

function getInitialFilters(filters: Record<string, string[]>) {
  return Object.entries(filters).map((entry) => {
    const [name, optionList] = entry
    return { name, optionList: optionList.map((name) => ({ name, checked: true })) }
  })
}

const DrawerFilters: FC<{
  disclosureOptions: { onClose: (() => void) & (() => void); isOpen: boolean }
  filters: Record<string, string[]>
  prevFilters: Record<string, any>
  onChange: (where: Filters) => void
}> = ({ filters, disclosureOptions, onChange, prevFilters }) => {
  const [filterList, setFilterList] = useState(getInitialFilters(filters))

  function handleFiltersChange(newFilterList: typeof filterList, prevFilters: Record<string, any>) {
    const touchedFilterList = newFilterList.filter((filterListItem) =>
      filterListItem.optionList.find((item) => !item.checked)
    )

    if (touchedFilterList.length === 0) {
      onChange(prevFilters?.OR ?? {})
      return
    }

    const groupedTouched = touchedFilterList.map((item) => {
      const groupedOptionList = item.optionList.reduce(
        (acc, item) => {
          acc[item.checked ? 'checked' : 'unchecked'].push(item.name)
          return acc
        },
        {
          checked: [] as string[],
          unchecked: [] as string[],
        }
      )

      return { name: item.name, groupedOptionList }
    })

    const parsedFilters = groupedTouched.reduce<Filters>((acc, item) => {
      const { checked, unchecked } = item.groupedOptionList
      const filter =
        checked.length < unchecked.length
          ? { [DBConditions.includes]: checked }
          : { [DBConditions.notIncludes]: unchecked }

      return { ...acc, [item.name]: filter }
    }, {})

    onChange({ ...prevFilters, ...parsedFilters })
  }

  const [debouncedFiltersChange] = useState(() => debounce(handleFiltersChange, 200))

  function handleOptionListChange(newFilterList: typeof filterList) {
    setFilterList(newFilterList)
    debouncedFiltersChange(newFilterList, prevFilters)
  }

  return (
    <Drawer placement="right" isOpen={disclosureOptions.isOpen} onClose={disclosureOptions.onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>
            <Accordion allowMultiple defaultIndex={[0]}>
              {filterList.map(({ name, optionList }) => (
                <AccordionItem key={name}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <Stack spacing={3}>
                      <Checkbox
                        size="sm"
                        colorScheme="green"
                        isChecked={
                          !optionList.find((optionListItem) => optionListItem.checked === false)
                        }
                        onChange={(e) =>
                          handleOptionListChange(
                            filterList.map((filterListItem) => ({
                              ...filterListItem,
                              optionList:
                                filterListItem.name === name
                                  ? filterListItem.optionList.map((optionListItem) => ({
                                      ...optionListItem,
                                      checked: e.target.checked,
                                    }))
                                  : filterListItem.optionList,
                            }))
                          )
                        }
                      >
                        Select all
                      </Checkbox>

                      {optionList.map((optionListItem) => (
                        <Checkbox
                          size="lg"
                          colorScheme="green"
                          key={optionListItem.name}
                          isChecked={optionListItem.checked}
                          onChange={(e) =>
                            handleOptionListChange(
                              filterList.map((filterListItem) => ({
                                ...filterListItem,
                                optionList:
                                  filterListItem.name === name
                                    ? filterListItem.optionList.map((item) => ({
                                        ...item,
                                        checked:
                                          item.name === optionListItem.name
                                            ? e.target.checked
                                            : item.checked,
                                      }))
                                    : filterListItem.optionList,
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
                onChange(null)
                setFilterList(getInitialFilters(filters))
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
