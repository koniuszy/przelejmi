import React, { FC } from 'react'

import { Td, useToast } from '@chakra-ui/react'

import { ClientListQuery, Clients_Set_Input, useUpdateClientMutation } from 'src/generated/hasura'

import Editable from 'src/components/Editable'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'
import { ClientType } from 'src/types'

const EditableColumns: FC<{
  client: ClientListQuery['clients'][number]
  isEditable: boolean
  onClientUpdate: (client: ClientListQuery['clients'][number]) => void
}> = ({ client, isEditable, onClientUpdate }) => {
  const toast = useToast()

  const [updateClient] = useUpdateClientMutation({
    onCompleted({ update_clients }) {
      if (!update_clients) throw new Error()
      toast({ ...successToastContent, title: 'Client updated' })
      update_clients.returning.map((i) => onClientUpdate({ ...client, ...i }))
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(set: Clients_Set_Input, id: number) {
    const [value] = Object.values(set)

    if (value === '' && set.vatId !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateClient({ variables: { where: { id: { _eq: id } }, _set: set } })
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
