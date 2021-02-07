import React, { FC, useEffect } from 'react'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
  ButtonGroup,
  Avatar,
  AvatarBadge,
} from '@chakra-ui/react'

import { useSession, signOut, signIn } from 'next-auth/client'

const Header: FC = () => {
  const router = useRouter()
  const [session, isSessionLoading] = useSession()

  useEffect(() => {
    console.log(session)
    if (!isSessionLoading && !session?.user) {
      signIn('google')
    }
  }, [isSessionLoading])

  return (
    <header>
      <Flex justifyContent="space-between" alignItems="center" px="40" py="5">
        <Center>
          <svg fill="teal" width="48" height="48" viewBox="0 0 512 512">
            <path d="M464 64h-416c-26.4 0-48 21.6-48 48v288c0 26.4 21.6 48 48 48h416c26.4 0 48-21.6 48-48v-288c0-26.4-21.6-48-48-48zM48 96h416c8.673 0 16 7.327 16 16v48h-448v-48c0-8.673 7.327-16 16-16zM464 416h-416c-8.673 0-16-7.327-16-16v-144h448v144c0 8.673-7.327 16-16 16zM64 320h32v64h-32zM128 320h32v64h-32zM192 320h32v64h-32z" />
          </svg>

          <Text
            pl="2"
            pt="1"
            textColor="teal"
            fontWeight="bold"
            fontSize="1.2rem"
            letterSpacing="5px"
            fontFamily="fantasy"
          >
            przelejmi
          </Text>
        </Center>

        <ButtonGroup variant="outline" spacing={5}>
          <NextLink href="/invoices">
            <Button
              w="100px"
              colorScheme="teal"
              variant={router.pathname.includes('invoices') ? 'outline' : 'ghost'}
            >
              Invoices
            </Button>
          </NextLink>

          <NextLink href="/scenarios">
            <Button
              w="100px"
              colorScheme="teal"
              variant={router.pathname.includes('scenarios') ? 'outline' : 'ghost'}
            >
              Scenarios
            </Button>
          </NextLink>

          <NextLink href="/clients">
            <Button
              w="100px"
              colorScheme="teal"
              variant={router.pathname.includes('clients') ? 'outline' : 'ghost'}
            >
              Clients
            </Button>
          </NextLink>

          <NextLink href="/merchants">
            <Button
              w="100px"
              colorScheme="teal"
              variant={router.pathname.includes('merchants') ? 'outline' : 'ghost'}
            >
              Merchants
            </Button>
          </NextLink>
        </ButtonGroup>

        <Menu>
          <MenuButton
            cursor="pointer"
            colorScheme="teal"
            as={Button}
            leftIcon={<AddIcon w={3} h={3} />}
            variant={router.pathname.includes('create') ? 'outline' : 'ghost'}
          >
            Create
          </MenuButton>
          <MenuList>
            <NextLink href="/invoices/create">
              <MenuItem>Invoice</MenuItem>
            </NextLink>
            <NextLink href="/scenarios/create">
              <MenuItem>Scenario</MenuItem>
            </NextLink>
            <NextLink href="/clients/create">
              <MenuItem>Client</MenuItem>
            </NextLink>
            <NextLink href="/merchants/create">
              <MenuItem>Merchant</MenuItem>
            </NextLink>
          </MenuList>
        </Menu>

        <Avatar zIndex={2} size="sm" name={session?.user.name} src={session?.user.image}>
          <AvatarBadge _hover={{ bg: 'gray.700' }} bg="black" cursor="pointer">
            <Menu>
              <MenuButton color="white" as={ChevronDownIcon}>
                Actions
              </MenuButton>
              <MenuList color="white">
                <MenuItem>Preferences</MenuItem>
                <MenuItem
                  color="red"
                  _hover={{ color: 'white', bg: 'red' }}
                  onClick={() => signOut()}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          </AvatarBadge>
        </Avatar>
      </Flex>
    </header>
  )
}

export default Header
