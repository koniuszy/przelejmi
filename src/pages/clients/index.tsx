import React, { FC, useState } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'
import NextLink from 'next/link'

import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
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
  Editable,
  EditablePreview,
  EditableInput,
  ButtonGroup,
  IconButton,
  Box,
  Flex,
  Center,
  useToast,
} from '@chakra-ui/react'

import { useMutation, useQuery } from '@apollo/client'
import { Client, PrismaClient } from '@prisma/client'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import { UPDATE_CLIENT_MUTATION } from 'src/graphql/mutations'
import { CLIENTS_QUERY } from 'src/graphql/queries'
import { ClientType } from 'src/types'

import DeleteClientPopover from 'src/components/DeleteClientPopover'

type SSGProps = {
  initialClientList: Client[]
}

const EditableCell: FC<{ defaultValue: string; onSubmit(newValue: string): void }> = ({
  defaultValue,
  onSubmit,
}) => (
  <Td>
    <Editable
      onSubmit={onSubmit}
      defaultValue={defaultValue}
      isPreviewFocusable={false}
      submitOnBlur={false}
    >
      {({ isEditing, onSubmit, onCancel, onEdit }) => (
        <Flex>
          <Box pr="2">
            {isEditing ? (
              <ButtonGroup justifyContent="center" size="sm">
                <IconButton
                  colorScheme="green"
                  aria-label="check"
                  icon={<CheckIcon />}
                  onClick={onSubmit}
                />
                <IconButton
                  colorScheme="red"
                  aria-label="close"
                  icon={<CloseIcon />}
                  onClick={onCancel}
                />
              </ButtonGroup>
            ) : (
              <IconButton aria-label="edit" size="xs" icon={<EditIcon />} onClick={onEdit} />
            )}
          </Box>

          <Center>
            <EditablePreview />
          </Center>
          <EditableInput pl="2" />
        </Flex>
      )}
    </Editable>
  </Td>
)

const App: FC<SSGProps> = ({ initialClientList }) => {
  const toast = useToast()
  const { data } = useQuery<{ clientList: Client[] }>(CLIENTS_QUERY)
  const [updateClient] = useMutation<{ updatedClient: Client }>(UPDATE_CLIENT_MUTATION, {
    onCompleted() {
      toast({ ...successToastContent, title: 'Client updated' })
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  const [clientDeletionId, setClientDeletionId] = useState<number | null>(null)
  const [openActionsRowId, setOpenActionsRowId] = useState<number | null>(null)

  const handleUpdate = (
    data: Partial<Record<keyof Client, { set: string | number }>>,
    id: number
  ) => {
    updateClient({ variables: { data, id } })
  }

  return (
    <div>
      <Head>
        <title>przelejmi | Clients</title>
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
              <Th>Post code</Th>
              <Th>City</Th>
              <Th>Country</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(data?.clientList || initialClientList).map((item) => (
              <Tr key={item.id}>
                <EditableCell
                  onSubmit={(name) => handleUpdate({ name: { set: name } }, item.id)}
                  defaultValue={item.name}
                />
                <Td>{item.nip ? ClientType.COMPANY : ClientType.PERSON}</Td>
                <EditableCell
                  onSubmit={(nip) =>
                    handleUpdate(
                      { nip: { set: isNaN(Number(nip)) ? 'error' : Number(nip) } },
                      item.id
                    )
                  }
                  defaultValue={item.nip?.toString()}
                />
                <EditableCell
                  onSubmit={(address) => handleUpdate({ address: { set: address } }, item.id)}
                  defaultValue={item.address}
                />
                <EditableCell
                  onSubmit={(postCode) => handleUpdate({ postCode: { set: postCode } }, item.id)}
                  defaultValue={item.postCode}
                />
                <EditableCell
                  onSubmit={(city) => handleUpdate({ city: { set: city } }, item.id)}
                  defaultValue={item.city}
                />
                <EditableCell
                  onSubmit={(country) => handleUpdate({ country: { set: country } }, item.id)}
                  defaultValue={item.country}
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
                          _focus={{ bg: 'red.400' }}
                          onClick={() => setClientDeletionId(item.id)}
                          icon={<DeleteIcon w={3} h={3} />}
                          py="0.4rem"
                          px="0.8rem"
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
  const initialClientList = await prisma.client.findMany()
  prisma.$disconnect()

  return { props: { initialClientList }, revalidate: 10 }
}

export default App
