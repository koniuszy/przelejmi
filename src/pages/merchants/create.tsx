import React, { FC } from 'react'

import Head from 'next/head'

import { useToast } from '@chakra-ui/react'

import MerchantForm from 'merchants/MerchantForm'

import { useCreateMerchantMutation } from 'src/generated/graphql'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

const CreateMerchantForm: FC = () => {
  const toast = useToast()

  const [createMerchant, { loading }] = useCreateMerchantMutation({
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Merchant created.',
      })
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  return (
    <MerchantForm
      isLoading={loading}
      initialValues={{
        companyName: '',
        address: '',
        postCode: '',
        city: '',
        country: '',
        VATId: '',
        bankAccountPln: '',
        bankAccountEur: '',
        bankName: '',
        email: '',
        issuerName: '',
      }}
      onSubmit={(values) =>
        createMerchant({
          variables: {
            data: values,
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
