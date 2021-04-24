import React, { FC } from 'react'

import NextLink from 'next/link'

import { Button } from '@chakra-ui/react'

import { signIn, signOut } from 'next-auth/client'

const ActionButtons: FC<{ isSession: boolean }> = ({ isSession }) => {
  if (!isSession)
    return (
      <Button
        colorScheme="teal"
        size="lg"
        onClick={() => {
          signIn()
        }}
      >
        Sign in
      </Button>
    )

  return (
    <>
      <Button
        colorScheme="red"
        size="sm"
        onClick={() => {
          signOut({ callbackUrl: '/' })
        }}
      >
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
