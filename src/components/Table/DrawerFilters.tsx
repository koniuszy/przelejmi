import React, { FC, useState } from 'react'

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

export const TriggerFiltersButton: FC<{ onOpen(): void }> = ({ onOpen }) => (
  <Button size="sm" rightIcon={<Search2Icon />} onClick={onOpen}>
    Filters
  </Button>
)

type FilterOption = Record<
  'in' | 'notIn' | 'equals' | 'lt' | 'lte' | 'gt' | 'gte' | 'equals' | 'startsWith' | 'endsWidth',
  string | string[]
>

const DrawerFilters: FC<{
  disclosureOptions: { onClose(): void; onClose(): void; isOpen: boolean }
  filters: Record<string, string[]>
  onSave(where: Record<string, FilterOption> | null): void
}> = ({ filters, disclosureOptions, onSave }) => {
  const [filterList, setFilterList] = useState(
    Object.entries(filters).map((entry) => {
      const [name, optionList] = entry
      return { name, optionList: optionList.map((name) => ({ name, checked: true })) }
    })
  )

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
                          setFilterList(
                            filterList.map((filterListItem) => ({
                              ...filterListItem,
                              optionList: filterListItem.optionList.map((optionListItem) => ({
                                ...optionListItem,
                                checked: e.target.checked,
                              })),
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
                            setFilterList(
                              filterList.map((filterListItem) => ({
                                ...filterListItem,
                                optionList: filterListItem.optionList.map((item) =>
                                  item.name === optionListItem.name
                                    ? {
                                        ...item,
                                        checked: e.target.checked,
                                      }
                                    : item
                                ),
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
            <Button variant="outline" mr={3} onClick={disclosureOptions.onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => {
                const touchedFilterList = filterList.filter((filterListItem) =>
                  filterListItem.optionList.find((item) => !item.checked)
                )

                if (touchedFilterList.length === 0) {
                  onSave(null)
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
                  const filter =
                    checked.length < unchecked.length ? { in: checked } : { notIn: unchecked }
                  return { ...acc, [item.name]: filter }
                }, {} as Record<string, FilterOption>)

                onSave(where as Record<string, FilterOption>)
              }}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default DrawerFilters
