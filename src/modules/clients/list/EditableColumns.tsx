import React, { FC } from 'react'

import { Td, useToast } from '@chakra-ui/react'

import {
  PaginatedClientListQuery,
  ClientUpdateInput,
  useUpdateClientMutation,
} from 'src/generated/graphql'

import Editable from 'src/components/Editable'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'
import { ClientType } from 'src/types'

type Client = PaginatedClientListQuery['clientList'][number]

const EditableColumns: FC<{
  client: Client
  isEditable: boolean
  onClientUpdate: (client: Client) => void
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

  function handleUpdate(data: ClientUpdateInput, id: number) {
    const [value] = Object.values(data)

    if (value === '' && data.vatId !== value) {
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
      <Td>{client.vatId ? ClientType.company : ClientType.person}</Td>
      {['vatId', 'address', 'postCode', 'city', 'country'].map((key) => (
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
