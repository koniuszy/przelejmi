import React, { FC, useState } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'
import NextLink from 'next/link'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

import { useQuery } from '@apollo/client'
import { Client, PrismaClient } from '@prisma/client'

import { CLIENTS_QUERY } from 'src/graphql/queries'
import { ClientType } from 'src/types'

import DeleteClientPopover from 'src/components/DeleteClientPopover'

type SSGProps = {
  initialClientList: Client[]
}

const App: FC<SSGProps> = ({ initialClientList }) => {
  const { data } = useQuery<{ clientList: Client[] }>(CLIENTS_QUERY)
  const [clientDeletionId, setClientDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)

  return (
    <div>
      <Head>
        <title>Clients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text fontSize="4xl" textAlign="center" pb="5">
          Your clients:
        </Text>

        <Table variant="simple">
          <TableCaption>List of all your clients</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>NIP</Th>
              <Th>Address</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(data?.clientList || initialClientList).map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.nip ? ClientType.COMPANY : ClientType.PERSON}</Td>
                <Td>{item.nip}</Td>
                <Td>
                  {item.address}, {item.postCode}, {item.city}, {item.country}
                </Td>
                <Td>
                  <Menu
                    onClose={() => setClientDeletionId(null)}
                    closeOnBlur={!clientDeletionId}
                    closeOnSelect={false}
                    isOpen={openActionsRowId === item.id}
                  >
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      cursor="pointer"
                      colorScheme="teal"
                      onClick={() => setOpenActionsRowId(item.id)}
                    >
                      …
                    </MenuButton>
                    <MenuList>
                      <NextLink href={`clients/${item.id}`}>
                        <MenuItem justifyContent="start" icon={<EditIcon w={3} h={3} />}>
                          Edit
                        </MenuItem>
                      </NextLink>

                      <DeleteClientPopover
                        id={item.id === clientDeletionId ? clientDeletionId : null}
                        onClose={() => {
                          setClientDeletionId(null)
                          setOpenActionsRowId(null)
                        }}
                      >
                        <MenuItem
                          bg="red.500"
                          _focus={{ bg: 'red.400' }}
                          onClick={() => setClientDeletionId(item.id)}
                          icon={<DeleteIcon w={3} h={3} />}
                        >
                          <Text>Delete</Text>
                        </MenuItem>
                      </DeleteClientPopover>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const prisma = new PrismaClient()

  const initialClientList = await prisma.client.findMany()

  return { props: { initialClientList }, revalidate: 10 }
}

export default App