import React, { FC, useState } from 'react'

import { ChevronDownIcon, Search2Icon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react'

export const TriggerFiltersButton: FC<{ onOpen(): void }> = ({ onOpen }) => (
  <Button size="sm" rightIcon={<Search2Icon />} onClick={onOpen}>
    Filters
  </Button>
)

const DrawerFilters: FC<{
  disclosureOptions: { onClose(): void; onClose(): void; isOpen: boolean }
  filters: Record<string, string[]>
}> = ({ filters, disclosureOptions }) => {
  const [filterList, setFilterList] = useState(
    Object.entries(filters).map((entry) => {
      const [name, optionList] = entry
      return { name, optionList: optionList.map((name) => ({ name, checked: false })) }
    })
  )

  return (
    <Drawer placement="right" isOpen={disclosureOptions.isOpen} onClose={disclosureOptions.onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>
            {filterList.map(({ name, optionList }) => (
              <Menu key={name} closeOnSelect={false}>
                <MenuButton w="100%" as={Button} rightIcon={<ChevronDownIcon />}>
                  {name}
                </MenuButton>

                <MenuList w="100%">
                  <MenuOptionGroup
                    type="checkbox"
                    title={
                      <Checkbox defaultIsChecked colorScheme="teal" size="sm">
                        <Text fontSize={12}>Select all</Text>
                      </Checkbox>
                    }
                  >
                    {optionList.map((optionListItem) => {
                      console.log(optionListItem.checked)
                      return (
                        <MenuItemOption
                          key={optionListItem.name}
                          isChecked={optionListItem.checked}
                          value={optionListItem.name}
                        >
                          {optionListItem.name}
                        </MenuItemOption>
                      )
                    })}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={disclosureOptions.onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default DrawerFilters
