import React, { FC } from 'react'

import Head from 'next/head'

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
} from '@chakra-ui/react'

import { useLottie } from 'lottie-react'
import { signIn, useSession } from 'next-auth/client'

import bigInvoiceAnimation from './bigInvoiceAnimation.json'

const Home: FC = () => {
  const [session, isSessionLoading] = useSession()

  const { View } = useLottie(
    {
      animationData: bigInvoiceAnimation,
      loop: true,
      autoplay: true,
    },
    { width: '400px' }
  )

  if (isSessionLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    )

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

        <Center>{View}</Center>

        <Center>
          <Button mt="5" size="lg" colorScheme="teal" onClick={() => signIn()}>
            Sign in
          </Button>
        </Center>
      </Box>
    </Flex>
  )
}

export default Home
