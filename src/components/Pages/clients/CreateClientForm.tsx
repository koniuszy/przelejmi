import React, { FC } from 'react'

import { useToast } from '@chakra-ui/react'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import { useCreateClientMutation, PaginatedClientListDocument } from 'src/generated/graphql'
import { ClientType, OptimizedImg } from 'src/types'

import ClientForm from 'src/components/ClientForm'

import { PER_PAGE } from './ClientList'

const CreateClientForm: FC<{
  calmInTrolleyImg: OptimizedImg
}> = ({ calmInTrolleyImg }) => {
  const toast = useToast()
  const [createClient, { loading }] = useCreateClientMutation({
    refetchQueries: [
      { query: PaginatedClientListDocument, variables: { take: PER_PAGE, skip: 0 } },
    ],
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
      optimizedImg={calmInTrolleyImg}
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
