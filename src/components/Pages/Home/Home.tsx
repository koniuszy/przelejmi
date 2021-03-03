import React, { FC } from 'react'

import { CalendarIcon, TimeIcon, UnlockIcon } from '@chakra-ui/icons'
import { Center, List, ListIcon, ListItem, Progress, Spinner, Box, Flex } from '@chakra-ui/react'

import Lottie from 'lottie-react'
import { useSession } from 'next-auth/client'

import ActionButtons from './ActionButtons'
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

  return (
    <Flex flexDir="column" flexWrap="nowrap" alignContent="space-between">
      <Box w="100%">
        <Progress mb="5" value={session ? 90 : 20} size="xs" colorScheme="teal" />
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
          <Lottie
            loop
            autoplay
            style={{ height: 400 }}
            animationData={session ? statsAnimation : bigInvoiceAnimation}
          />
        </Center>

        <Center mt="5">
          <ActionButtons isSession={Boolean(session)} />
        </Center>
      </Box>
    </Flex>
  )
}

export default Home
