import React, { FC } from 'react'

import { useToast } from '@chakra-ui/react'

import { useCreateMerchantMutation } from 'src/generated/graphql'
import { errorToastContent, successToastContent } from 'src/lib/toastContent'
import MerchantForm from 'src/merchants/MerchantForm'

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

export default CreateMerchantForm
