import { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useToast } from '@chakra-ui/react'

import ClientForm from 'clients/ClientForm'

import { useCreateClientMutation } from 'src/generated/hasura'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'
import { ClientType } from 'src/types'

const CreateClientPage: NextPage = () => {
  const toast = useToast()
  const router = useRouter()

  const [createClient, { loading }] = useCreateClientMutation({
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Client created.',
      })
      router.push('/clients')
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  return (
    <>
      <Head>
        <title>Create client | przelejmi</title>
      </Head>

      <ClientForm
        isLoading={loading}
        initialValues={{ name: '', address: '', postCode: '', city: '', country: '', vatId: '' }}
        onSubmit={(values) => {
          const { vatId, clientType, ...data } = values
          createClient({
            variables: {
              object: { ...data, vatId: clientType === ClientType.company ? vatId : null },
            },
          })
        }}
      />
    </>
  )
}

export default CreateClientPage
