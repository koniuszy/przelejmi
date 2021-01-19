import React, { FC } from 'react'

import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react'
import Head from 'next/head'

import downloadPdf from 'lib/downloadPdf'

const App: FC = () => {
  return (
    <div>
      <Head>
        <title>Home page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text fontSize="4xl" textAlign="center">
          Your scenarios:
        </Text>

        <Table variant="simple">
          <TableCaption>List of all available scenarios</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Account number</Th>
              <Th>Buyer</Th>
              <Th>Body</Th>
              <Th isNumeric>Total Net</Th>
              <Th isNumeric>VAT %</Th>
              <Th isNumeric>Total Gross</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>

        <Button onClick={() => downloadPdf({ language: 'pl' })} colorScheme="teal" size="lg">
          Download
        </Button>
      </main>
    </div>
  )
}

export default App
