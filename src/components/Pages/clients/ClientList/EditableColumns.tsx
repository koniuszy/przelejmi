import React, { FC } from 'react'

import { Td, useToast } from '@chakra-ui/react'

import { Client } from 'prisma/prisma-client'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import { useUpdateClientMutation } from 'src/generated/graphql'
import { ClientType } from 'src/types'

import Editable from 'src/components/Editable'

const EditableColumns: FC<{
  client: Client
  isEditable: boolean
  onClientUpdate(client: Client): void
}> = ({ client, isEditable, onClientUpdate }) => {
  const toast = useToast()

  const [updateClient] = useUpdateClientMutation({
    onCompleted({ updatedClient }) {
      toast({ ...successToastContent, title: 'Client updated' })
      onClientUpdate(updatedClient as Client)
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(data: Partial<Client>, id: number) {
    const [value] = Object.values(data)

    if (value === '' && data.VATId !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateClient({ variables: { data, id } })
  }

  return (
    <>
      <Td>
        <Editable
          defaultValue={client.name}
          isDisabled={!isEditable}
          onSubmit={(name) => handleUpdate({ name }, client.id)}
        />
      </Td>
      <Td>{client.VATId ? ClientType.company : ClientType.person}</Td>
      {['VATId', 'address', 'post Code', 'city', 'country'].map((key) => (
        <Td key={key}>
          <Editable
            defaultValue={client[key]}
            isDisabled={!isEditable}
            onSubmit={(value) => handleUpdate({ [key]: value }, client.id)}
          />
        </Td>
      ))}
    </>
  )
}

export default EditableColumns