import { NextPage } from 'next'

import dynamic from 'next/dynamic'
import Head from 'next/head'

import { CalendarIcon, TimeIcon, UnlockIcon } from '@chakra-ui/icons'
import { Center, List, ListIcon, ListItem, Spinner, Box, Flex } from '@chakra-ui/react'

import { useAuth } from 'src/hooks/auth'

const AnimationSection = dynamic(() => import('src/components/Home/AnimationSection'))

const HomePage: NextPage = () => {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <>
      <Head>
        <title>Home page | przelejmi</title>
      </Head>

      <Flex flexDir="column" flexWrap="nowrap" alignContent="space-between">
        <Box w="100%">
          <List spacing={3}>
            <ListItem>
              <ListIcon as={UnlockIcon} color="teal.200" />
              Sign in
            </ListItem>
            <ListItem>
              <ListIcon as={CalendarIcon} color="teal.200" />
              Customize your client base
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="teal.200" />
              Get your money
            </ListItem>
          </List>

          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <AnimationSection isLoggedIn={isAuthenticated} />
          )}
        </Box>
      </Flex>
    </>
  )
}

export default HomePage
