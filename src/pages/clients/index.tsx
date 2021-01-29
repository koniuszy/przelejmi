import React, { FC, useState } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'
import NextLink from 'next/link'

import { DeleteIcon, EditIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
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
  Flex,
  Center,
  useToast,
  Switch,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react'

import { useMutation, useQuery } from '@apollo/client'
import { Client, PrismaClient } from '@prisma/client'
import ReactPaginate from 'react-paginate'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import { UPDATE_CLIENT_MUTATION } from 'src/graphql/mutations'
import { CLIENTS_QUERY } from 'src/graphql/queries'
import { ClientType } from 'src/types'

import DeleteClientPopover from 'src/components/Table/DeleteClientPopover'
import EditableCell from 'src/components/Table/EditableCell'

type SSGProps = {
  initialClientList: Client[]
}

const App: FC<SSGProps> = ({ initialClientList }) => {
  const toast = useToast()
  const [isEditable, setIsEditable] = useState(false)
  const [clientDeletionId, setClientDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)

  const { data } = useQuery<{ clientList: Client[] }>(CLIENTS_QUERY)

  const [updateClient, updateClientOptions] = useMutation<{ updatedClient: Client }>(
    UPDATE_CLIENT_MUTATION,
    {
      onCompleted(response) {
        toast({ ...successToastContent, title: 'Client updated' })
        updateClientOptions.client.writeQuery({
          query: CLIENTS_QUERY,
          data: {
            ...data,
            clientList: data.clientList.map((item) =>
              item.id === response.updatedClient.id ? response.updatedClient : item
            ),
          },
        })
      },
      onError() {
        toast(errorToastContent)
        toast(warningToastContent)
      },
    }
  )

  const handleUpdate = (
    data: Partial<Record<keyof Client, { set: string | number }>>,
    id: number
  ) => {
    const [value] = Object.values(data)
    if (value.set === '') {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateClient({ variables: { data, id } })
  }

  const clientList = data?.clientList || initialClientList

  return (
    <div>
      <Head>
        <title>przelejmi | Clients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex justifyContent="space-between" pb="5">
          <Text fontSize="4xl" textAlign="center">
            Your clients:
          </Text>

          <Center>
            <FormControl id="editable" display="flex" alignItems="center">
              <FormLabel htmlFor="editable" mb="0">
                Editable
              </FormLabel>
              <Switch
                size="lg"
                colorScheme="teal"
                defaultChecked={isEditable}
                onChange={(e) => setIsEditable(e.target.checked)}
              />
            </FormControl>
          </Center>
        </Flex>

        <Table variant="simple">
          <TableCaption>
            {clientList.length > 0 ? (
              'List of all your clients'
            ) : (
              <>
                <Heading as="h2">No clients yet 🤫</Heading>
                <NextLink href="/create/client">
                  <Button size="lg" mt={5} colorScheme="teal">
                    Create
                  </Button>
                </NextLink>
              </>
            )}
          </TableCaption>
          <Thead>
            <Tr>
              <Th />
              <Th>
                <Flex>
                  <Center>Name</Center>
                  <Flex ml="2" direction="column">
                    <TriangleUpIcon />
                    <TriangleDownIcon />
                  </Flex>
                </Flex>
              </Th>
              <Th>Type</Th>
              <Th>NIP</Th>
              <Th>Address</Th>
              <Th>Post code</Th>
              <Th>City</Th>
              <Th>Country</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clientList.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}.</Td>
                <EditableCell
                  defaultValue={item.name}
                  isDisabled={!isEditable}
                  onSubmit={(name) => handleUpdate({ name: { set: name } }, item.id)}
                />
                <Td>{item.nip ? ClientType.COMPANY : ClientType.PERSON}</Td>
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.nip?.toString()}
                  onSubmit={(nip) =>
                    handleUpdate(
                      { nip: { set: isNaN(Number(nip)) ? 'error' : Number(nip) } },
                      item.id
                    )
                  }
                />
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.address}
                  onSubmit={(address) => handleUpdate({ address: { set: address } }, item.id)}
                />
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.postCode}
                  onSubmit={(postCode) => handleUpdate({ postCode: { set: postCode } }, item.id)}
                />
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.city}
                  onSubmit={(city) => handleUpdate({ city: { set: city } }, item.id)}
                />
                <EditableCell
                  isDisabled={!isEditable}
                  defaultValue={item.country}
                  onSubmit={(country) => handleUpdate({ country: { set: country } }, item.id)}
                />
                <Td>
                  <Menu onClose={() => setClientDeletionId(null)} closeOnSelect={false}>
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      cursor="pointer"
                      colorScheme="teal"
                      onClick={() =>
                        setOpenActionsRowId(openActionsRowId === item.id ? null : item.id)
                      }
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
                          py="0.4rem"
                          px="0.8rem"
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

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  const prisma = new PrismaClient()
  const initialClientList = await prisma.client.findMany({ take: 20 })
  prisma.$disconnect()

  return { props: { initialClientList }, revalidate: 10 }
}

export default App
