import React, { FC } from 'react'

import { useToast } from '@chakra-ui/react'

import { useUpdateMerchantMutation, useMerchantQuery } from 'src/generated/graphql'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'
import MerchantForm from 'src/merchants/MerchantForm'

const EditMerchantForm: FC<{
  merchantId: number
}> = ({ merchantId }) => {
  const toast = useToast()

  const { data, updateQuery } = useMerchantQuery({ variables: { where: { id: merchantId } } })

  const [updateMerchant, { loading }] = useUpdateMerchantMutation({
    onCompleted({ updatedMerchant }) {
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((p) => ({ ...p, merchant: updatedMerchant }))
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  if (!data)
    return (
      <div>
        <MerchantForm
          isLoading={true}
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
          onSubmit={() => {}}
        />
      </div>
    )

  return (
    <MerchantForm
      isLoading={loading}
      initialValues={{ ...data.merchant, bankAccountEur: data.merchant.bankAccountEur ?? '' }}
      onSubmit={(values) => updateMerchant({ variables: { data: values, id: merchantId } })}
    />
  )
}

export default EditMerchantForm
