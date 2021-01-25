import React, { FC, useState } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'

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

import { useQuery, gql } from '@apollo/client'
import { Client, PrismaClient } from '@prisma/client'

import { ClientType } from 'src/types'

import DeletePopover from 'src/components/DeletePopover'

type SSGProps = {
  initialClients: Client[]
}

const clientsQuery = gql`
  {
    clients {
      id
      name
      address
      postCode
      city
      country
      nip
    }
  }
`

const App: FC<SSGProps> = ({ initialClients }) => {
  const { data } = useQuery<{ clients: Client[] }>(clientsQuery)
  const [clientDeletionId, setClientDeletionId] = useState<string | null>(null)

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
            {(data?.clients || initialClients).map((item) => (
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
                  >
                    <MenuButton cursor="pointer" colorScheme="teal" as={Button} variant={'ghost'}>
                      …
                    </MenuButton>
                    <MenuList>
                      <MenuItem justifyContent="start" icon={<EditIcon w={3} h={3} />}>
                        Edit
                      </MenuItem>
                      <MenuItem
                        data-id={item.id}
                        onClick={(e) => {
                          const target = e.target as HTMLButtonElement
                          setClientDeletionId(target.getAttribute('data-id'))
                        }}
                        bg="red.500"
                        _focus={{ bg: 'red.400' }}
                        icon={<DeleteIcon w={3} h={3} />}
                      >
                        <DeletePopover
                          id={clientDeletionId}
                          onClose={() => setClientDeletionId(null)}
                        >
                          <Text>Delete</Text>
                        </DeletePopover>
                      </MenuItem>
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

  const initialClients = await prisma.client.findMany()

  return { props: { initialClients }, revalidate: 10 }
}

export default App
