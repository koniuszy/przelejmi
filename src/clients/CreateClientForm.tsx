import React, { FC } from 'react'

import { useToast } from '@chakra-ui/react'

import { useCreateClientMutation } from 'src/generated/graphql'

import ClientForm from 'src/clients/ClientForm'
import { errorToastContent, successToastContent } from 'src/lib/toastContent'
import { ClientType } from 'src/types'

const CreateClientForm: FC = () => {
  const toast = useToast()
  const [createClient, { loading }] = useCreateClientMutation({
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Client created.',
      })
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  return (
    <ClientForm
      isLoading={loading}
      initialValues={{ name: '', address: '', postCode: '', city: '', country: '', VATId: '' }}
      onSubmit={(values) => {
        const { VATId, clientType, ...data } = values
        createClient({
          variables: {
            data: { ...data, VATId: clientType === ClientType.company ? VATId : null },
          },
        })
      }}
    />
  )
}

export default CreateClientForm
