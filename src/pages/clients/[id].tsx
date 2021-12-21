import { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useToast } from '@chakra-ui/react'

import ClientForm from 'clients/ClientForm'

import { useClientQuery, useUpdateClientMutation } from 'src/generated/hasura'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'
import { ClientType } from 'src/types'

const EditClientFormPage: NextPage = () => {
  const toast = useToast()
  const router = useRouter()
  const clientId = Number(router.query.id)

  const { data, updateQuery } = useClientQuery({ variables: { id: { _eq: clientId } } })

  const [updateClient, { loading }] = useUpdateClientMutation({
    onCompleted({ update_clients }) {
      if (!update_clients) throw new Error()

      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((prev) => ({ ...prev, clients: update_clients[0] }))
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  if (!data)
    return (
      <div>
        <ClientForm
          isLoading={true}
          initialValues={{ name: '', address: '', postCode: '', city: '', country: '', vatId: '' }}
          onSubmit={() => {}}
        />
      </div>
    )

  const { __typename, id, ...initialValues } = data.clients[0]
  return (
    <>
      <Head>
        <title>Edit client | przelejmi</title>
      </Head>

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
    </>
  )
}

export default EditClientFormPage
