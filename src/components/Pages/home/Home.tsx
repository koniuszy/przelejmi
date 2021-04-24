import React, { FC } from 'react'

import dynamic from 'next/dynamic'

import { CalendarIcon, TimeIcon, UnlockIcon } from '@chakra-ui/icons'
import { Center, List, ListIcon, ListItem, Progress, Spinner, Box, Flex } from '@chakra-ui/react'

import useSession from 'src/hooks/useSession'

const AnimationSection = dynamic(() => import('./AnimationSection'))

const Home: FC = () => {
  const [session, isSessionLoading] = useSession()

  return (
    <Flex flexDir="column" flexWrap="nowrap" alignContent="space-between">
      <Box w="100%">
        <Progress mb="5" size="xs" colorScheme="teal" value={100} />
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

        {isSessionLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <AnimationSection session={session} />
        )}
      </Box>
    </Flex>
  )
}

export default Home
