import React, { FC } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useToast } from '@chakra-ui/react'

import ClientForm from 'clients/ClientForm'

import { useClientQuery, useUpdateClientMutation } from 'src/generated/hasura'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'
import { ClientType } from 'src/types'

const EditClientForm: FC = () => {
  const toast = useToast()
  const router = useRouter()
  const clientId = Number(router.query.id)

  const { data, updateQuery } = useClientQuery({ variables: { id: { _eq: clientId } } })

  const [updateClient, { loading }] = useUpdateClientMutation({
    onCompleted({ update_Client }) {
      if (!update_Client) throw new Error()

      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((prev) => ({ ...prev, Client: update_Client[0] }))
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  if (!data?.Client.length)
    return (
      <div>
        <ClientForm
          isLoading={true}
          initialValues={{ name: '', address: '', postCode: '', city: '', country: '', vatId: '' }}
          onSubmit={() => {}}
        />
      </div>
    )

  const { __typename, id, ...initialValues } = data.Client[0]
  return (
    <ClientForm
      isLoading={loading}
      initialValues={{ ...initialValues, vatId: initialValues.vatId ?? '' } || {}}
      onSubmit={(values) => {
        const { vatId, clientType, ...data } = values
        updateClient({
          variables: {
            where: { id: { _eq: id } },
            _set: { ...data, vatId: clientType === ClientType.company ? vatId : null },
          },
        })
      }}
    />
  )
}

const EditClientFormPage: FC = () => (
  <>
    <Head>
      <title>Edit client | przelejmi</title>
    </Head>
    <EditClientForm />
  </>
)

export default EditClientFormPage
