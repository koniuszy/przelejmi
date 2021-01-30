import React, { FC, useCallback, useState } from 'react'

import { Search2Icon } from '@chakra-ui/icons'
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

import useConstant from 'src/hooks'

export const TriggerFiltersButton: FC<{ onOpen(): void }> = ({ onOpen }) => (
  <Button size="sm" rightIcon={<Search2Icon />} onClick={onOpen}>
    Filters
  </Button>
)

type FilterOption = Record<
  'in' | 'notIn' | 'equals' | 'lt' | 'lte' | 'gt' | 'gte' | 'equals' | 'startsWith' | 'endsWidth',
  string | string[]
>

function getInitialFilters(filters: Record<string, string[]>) {
  return Object.entries(filters).map((entry) => {
    const [name, optionList] = entry
    return { name, optionList: optionList.map((name) => ({ name, checked: true })) }
  })
}

const DrawerFilters: FC<{
  disclosureOptions: { onClose(): void; onClose(): void; isOpen: boolean }
  filters: Record<string, string[]>
  onChange(where: Record<string, FilterOption> | null): void
}> = ({ filters, disclosureOptions, onChange }) => {
  const [filterList, setFilterList] = useState(getInitialFilters(filters))

  const debouncedFiltersChange = useConstant(() =>
    debounce((newFilterList: typeof filterList) => {
      const touchedFilterList = newFilterList.filter((filterListItem) =>
        filterListItem.optionList.find((item) => !item.checked)
      )

      if (touchedFilterList.length === 0) {
        onChange(null)
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

      const where = groupedTouched.reduce((acc, item) => {
        const { checked, unchecked } = item.groupedOptionList
        const filter = checked.length < unchecked.length ? { in: checked } : { notIn: unchecked }
        return { ...acc, [item.name]: filter }
      }, {} as Record<string, FilterOption>)

      onChange(where as Record<string, FilterOption>)
    }, 100)
  )

  function handleOptionListChange(newFilterList: typeof filterList) {
    setFilterList(newFilterList)
    debouncedFiltersChange(newFilterList)
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
