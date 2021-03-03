import React, { FC } from 'react'

import { Flex, RadioGroup, Stack, Radio, Text, useToast, Spinner } from '@chakra-ui/react'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  PaginatedClientListDocument,
  ClientContentFragment,
  useUpdateClientMutation,
  useClientQuery,
} from 'src/generated/graphql'
import { ClientType, OptimizedImg } from 'src/types'

import BlurredImg from 'src/components/BlurredImg'
import Editable from 'src/components/Editable'

import { PER_PAGE } from './ClientTable'

const ClientDetailsForm: FC<{
  client: ClientContentFragment
  onUpdate(data: Partial<ClientContentFragment>): void
}> = ({ client, onUpdate }) => (
  <Flex direction="column">
    <RadioGroup
      value={client.VATId ? ClientType.company : ClientType.person}
      onChange={() => onUpdate({ VATId: client.VATId ? null : '0' })}
    >
      <Text fontWeight="500">Client type</Text>
      <Stack pt="3" spacing={5} direction="row">
        {Object.values(ClientType).map((value) => (
          <Radio key={value} cursor="pointer" colorScheme="green" value={value}>
            {value}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>

    <Text pt="5" pb="2" fontWeight="500">
      Name
    </Text>
    <Editable border defaultValue={client.name} onSubmit={(name) => onUpdate({ name })} />

    {client.VATId && (
      <>
        <Text pt="5" pb="2" fontWeight="500">
          Vat id
        </Text>
        <Editable border defaultValue={client.VATId} onSubmit={(VATId) => onUpdate({ VATId })} />
      </>
    )}

    <Text pt="10" pb="2" fontWeight="500">
      Street name and number
    </Text>
    <Editable border defaultValue={client.address} onSubmit={(address) => onUpdate({ address })} />

    <Text pt="4" pb="2" fontWeight="500">
      Post code
    </Text>
    <Editable
      border
      defaultValue={client.postCode}
      onSubmit={(postCode) => onUpdate({ postCode })}
    />

    <Text pt="4" pb="2" fontWeight="500">
      City
    </Text>
    <Editable border defaultValue={client.city} onSubmit={(city) => onUpdate({ city })} />

    <Text pt="4" pb="2" fontWeight="500">
      Country
    </Text>
    <Editable border defaultValue={client.country} onSubmit={(country) => onUpdate({ country })} />
  </Flex>
)

const ClientDetails: FC<{
  calmInTrolleyImg: OptimizedImg
  clientId: number
}> = ({ calmInTrolleyImg, clientId }) => {
  const toast = useToast()
  const { data, updateQuery } = useClientQuery({ variables: { where: { id: clientId } } })

  const [updateClient, updateClientOptions] = useUpdateClientMutation({
    onCompleted(response) {
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((prev) => ({ ...prev, client: response.updatedClient }))

      const data = updateClientOptions.client.readQuery({ query: PaginatedClientListDocument })

      if (!data) {
        updateClientOptions.client
          .query({
            query: PaginatedClientListDocument,
            variables: { skip: 0, take: PER_PAGE },
          })
          .then((res) => {
            if (!res.data.clientList?.length) return
            updateClientOptions.client.writeQuery({
              query: PaginatedClientListDocument,
              data: { ...res, clientList: [response.updatedClient] },
            })
          })
        return
      }

      updateClientOptions.client.writeQuery({
        query: PaginatedClientListDocument,
        data: { ...data, clientList: [...data.clientList, response.updatedClient] },
      })
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  function handleUpdate(data: Partial<ClientContentFragment>) {
    updateClient({ variables: { data, id: clientId } })
  }

  return (
    <Flex>
      <BlurredImg optimizedImg={calmInTrolleyImg} width={500} />

      {data ? <ClientDetailsForm client={data.client} onUpdate={handleUpdate} /> : <Spinner />}
    </Flex>
  )
}

export default ClientDetails
