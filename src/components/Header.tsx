import React, { FC } from 'react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import { Center, Flex, Menu, MenuButton, MenuItem, MenuList, Text, Button } from '@chakra-ui/react'

const Header: FC = () => {
  return (
    <header>
      <Flex px="40" py="5">
        <svg fill="teal" width="48" height="48" viewBox="0 0 512 512">
          <path d="M464 64h-416c-26.4 0-48 21.6-48 48v288c0 26.4 21.6 48 48 48h416c26.4 0 48-21.6 48-48v-288c0-26.4-21.6-48-48-48zM48 96h416c8.673 0 16 7.327 16 16v48h-448v-48c0-8.673 7.327-16 16-16zM464 416h-416c-8.673 0-16-7.327-16-16v-144h448v144c0 8.673-7.327 16-16 16zM64 320h32v64h-32zM128 320h32v64h-32zM192 320h32v64h-32z" />
        </svg>

        <Center>
          <Text
            fontWeight="bold"
            fontSize="1.2rem"
            fontFamily="fantasy"
            pl="2"
            pt="1"
            textColor="teal"
            letterSpacing="5px"
          >
            przelejmi
          </Text>
        </Center>

        <Menu>
          <MenuButton colorScheme="blue" as={Button} rightIcon={<ChevronDownIcon />}>
            Create
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </header>
  )
}

export default Header
