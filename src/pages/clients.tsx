import React, { FC } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'

import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Text } from '@chakra-ui/react'

import { useQuery, gql } from '@apollo/client'
import { Client, PrismaClient } from '@prisma/client'

import { ClientType } from 'src/types'

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
            </Tr>
          </Thead>
          <Tbody>
            {(data?.clients || initialClients).map((item) => (
              <Tr>
                <Td>{item.name}</Td>
                <Td>{item.nip ? ClientType.COMPANY : ClientType.PERSON}</Td>
                <Td>{item.nip}</Td>
                <Td>
                  {item.address}, {item.postCode}, {item.city}, {item.country}
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
