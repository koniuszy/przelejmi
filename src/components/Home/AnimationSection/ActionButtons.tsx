import React, { FC } from 'react'

import NextLink from 'next/link'

import { Button } from '@chakra-ui/react'

import { useSession } from 'src/lib/auth'

const ActionButtons: FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const { login, logOut } = useSession()

  if (!isLoggedIn)
    return (
      <Button
        colorScheme="teal"
        size="lg"
        onClick={() => {
          login()
        }}
      >
        Sign in
      </Button>
    )

  return (
    <>
      <Button colorScheme="red" size="sm" onClick={logOut}>
        Sign out
      </Button>

      <NextLink href="/scenarios">
        <Button ml="20" colorScheme="teal" size="lg">
          Create an invoice
        </Button>
      </NextLink>

      <NextLink href="/preferences">
        <Button size="sm" ml="20">
          Your profile
        </Button>
      </NextLink>
    </>
  )
}

export default ActionButtons
