import React, { FC } from 'react'

import { useToast } from '@chakra-ui/react'

import ClientForm from 'src/clients/ClientForm'
import { useUpdateClientMutation, useClientQuery } from 'src/generated/graphql'
import { errorToastContent, successToastContent } from 'src/lib/toastContent'
import { ClientType } from 'src/types'

const EditClientForm: FC<{
  clientId: number
}> = ({ clientId }) => {
  const toast = useToast()

  const { data, updateQuery } = useClientQuery({ variables: { where: { id: clientId } } })

  const [updateClient, { loading }] = useUpdateClientMutation({
    onCompleted({ updatedClient }) {
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((prev) => ({ ...prev, client: updatedClient }))
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  if (!data)
    return (
      <ClientForm
        isLoading={true}
        initialValues={{ name: '', address: '', postCode: '', city: '', country: '', VATId: '' }}
        onSubmit={() => {}}
      />
    )

  return (
    <ClientForm
      isLoading={loading}
      initialValues={{ ...data.client, VATId: data.client.VATId ?? '' }}
      onSubmit={(values) => {
        const { VATId, clientType, ...data } = values
        updateClient({
          variables: {
            data: { ...data, VATId: clientType === ClientType.company ? VATId : null },
            id: clientId,
          },
        })
      }}
    />
  )
}

export default EditClientForm
