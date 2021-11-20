import React, { FC } from 'react'

import { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useToast } from '@chakra-ui/react'

import ClientForm from 'clients/ClientForm'

import { useCreateClientMutation } from 'src/generated/graphql'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'
import { ClientType } from 'src/types'

const CreateClientForm: FC = () => {
  const toast = useToast()
  const router = useRouter()

  const [createClient, { loading }] = useCreateClientMutation({
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Client created.',
      })
      router.push('/merchants')
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  return (
    <ClientForm
      isLoading={loading}
      initialValues={{ name: '', address: '', postCode: '', city: '', country: '', vatId: '' }}
      onSubmit={(values) => {
        const { vatId, clientType, ...data } = values
        createClient({
          variables: {
            data: { ...data, vatId: clientType === ClientType.company ? vatId : null },
          },
        })
      }}
    />
  )
}

const CreateClientPage: NextPage = () => (
  <>
    <Head>
      <title>Create client | przelejmi</title>
    </Head>

    <CreateClientForm />
  </>
)

export default CreateClientPage
