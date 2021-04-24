import React, { FC } from 'react'

import { useToast } from '@chakra-ui/react'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  PaginatedClientListDocument,
  useUpdateClientMutation,
  useClientQuery,
} from 'src/generated/graphql'
import { ClientType, OptimizedImg } from 'src/types'

import ClientForm from 'src/components/ClientForm'

import { PER_PAGE } from './ClientList'

const EditClientForm: FC<{
  calmInTrolleyImg: OptimizedImg
  clientId: number
}> = ({ calmInTrolleyImg, clientId }) => {
  const toast = useToast()

  const { data, updateQuery } = useClientQuery({ variables: { where: { id: clientId } } })

  const [updateClient, { loading }] = useUpdateClientMutation({
    refetchQueries: [
      { query: PaginatedClientListDocument, variables: { take: PER_PAGE, skip: 0 } },
    ],
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
        optimizedImg={calmInTrolleyImg}
        initialValues={{ name: '', address: '', postCode: '', city: '', country: '', VATId: '' }}
        onSubmit={() => {}}
      />
    )

  return (
    <ClientForm
      isLoading={loading}
      optimizedImg={calmInTrolleyImg}
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
