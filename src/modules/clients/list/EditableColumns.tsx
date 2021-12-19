import React, { FC } from 'react'

import { Td, useToast } from '@chakra-ui/react'

import { ClientFragment, useUpdateClientMutation } from 'src/generated/hasura'

import Editable from 'src/components/Editable'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'
import { ClientType } from 'src/types'

const EditableColumns: FC<{
  client: ClientFragment
  isEditable: boolean
  onClientUpdate: (client: ClientFragment) => void
}> = ({ client, isEditable, onClientUpdate }) => {
  const toast = useToast()

  const [updateClient] = useUpdateClientMutation({
    onCompleted({ update_Client }) {
      if (!update_Client) throw new Error()
      toast({ ...successToastContent, title: 'Client updated' })
      update_Client.returning.map(onClientUpdate)
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(data: Partial<ClientFragment>, id: number) {
    const [value] = Object.values(data)

    if (value === '' && data.vatId !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateClient({ variables: { where: { id: { _eq: id } }, _set: data } })
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
