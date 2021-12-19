import React, { FC } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useToast } from '@chakra-ui/react'

import MerchantForm from 'merchants/MerchantForm'

import { useCreateMerchantMutation } from 'src/generated/hasura'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

const CreateMerchantForm: FC = () => {
  const toast = useToast()
  const router = useRouter()

  const [createMerchant, { loading }] = useCreateMerchantMutation({
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Merchant created.',
      })
      router.push('/merchants')
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  return (
    <MerchantForm
      isSubmitting={loading}
      initialValues={{
        companyName: '',
        address: '',
        postCode: '',
        city: '',
        country: '',
        vatId: '',
        bankAccountPln: '',
        bankAccountEur: '',
        bankName: '',
        email: '',
        issuerName: '',
      }}
      onSubmit={(objects) =>
        createMerchant({
          variables: {
            objects,
          },
        })
      }
    />
  )
}

const CreateMerchantPage: FC = () => (
  <>
    <Head>
      <title>Create merchant | przelejmi</title>
    </Head>

    <main>
      <CreateMerchantForm />
    </main>
  </>
)

export default CreateMerchantPage
