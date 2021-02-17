import React, { FC } from 'react'

import { CalendarIcon, TimeIcon, UnlockIcon } from '@chakra-ui/icons'
import {
  Center,
  List,
  ListIcon,
  ListItem,
  Progress,
  Spinner,
  Button,
  Box,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'

import Lottie from 'lottie-react'
import { signIn, useSession } from 'next-auth/client'

import bigInvoiceAnimation from './bigInvoiceAnimation.json'
import statsAnimation from './statsAnimation.json'

const Home: FC = () => {
  const [session, isSessionLoading] = useSession()

  if (isSessionLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    )

  if (session)
    return (
      <Flex flexDir="column" flexWrap="nowrap" alignContent="space-between">
        <Box w="100%">
          <Progress mb="5" value={20} size="xs" colorScheme="teal" />
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

          <Center>
            <Lottie loop autoplay animationData={bigInvoiceAnimation} />
          </Center>

          <Center>
            <Button mt="5" size="lg" colorScheme="teal" onClick={() => signIn()}>
              Sign in
            </Button>
          </Center>
        </Box>
      </Flex>
    )

  return (
    <Box>
      <Flex>
        <Lottie loop autoplay style={{ width: 200 }} animationData={statsAnimation} />

        <Center>
          <Heading>
            Welcome back{' '}
            <Text as="span" color="teal.200">
              {session.user.name}
            </Text>{' '}
            !
          </Heading>
        </Center>
      </Flex>
    </Box>
  )
}

export default Home
