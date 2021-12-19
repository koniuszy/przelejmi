import React, { FC } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useToast } from '@chakra-ui/react'

import MerchantForm from 'merchants/MerchantForm'

import { useMerchantQuery, useUpdateMerchantMutation } from 'src/generated/hasura'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

const EditMerchantForm: FC = () => {
  const router = useRouter()
  const merchantId = Number(router.query.id)

  const toast = useToast()

  const { data, updateQuery } = useMerchantQuery({ variables: { id: { _eq: merchantId } } })

  const [updateMerchant, { loading }] = useUpdateMerchantMutation({
    onCompleted({ update_Merchant }) {
      if (!update_Merchant) throw new Error()
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((p) => ({ ...p, Merchant: update_Merchant.returning }))
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
          isSubmitting={false}
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
          onSubmit={() => {}}
        />
      </div>
    )

  const { __typename, id, ...initialValues } = data.Merchant[0]
  return (
    <MerchantForm
      isSubmitting={loading}
      initialValues={{ ...initialValues, bankAccountEur: initialValues.bankAccountEur ?? '' }}
      onSubmit={(set) => updateMerchant({ variables: { where: { id: { _eq: id } }, _set: set } })}
    />
  )
}

type SSGProps = {
  merchantId: number
}

const EditMerchantFormPage: FC<SSGProps> = () => (
  <>
    <Head>
      <title>Edit merchant | przelejmi</title>
    </Head>
    <main>
      <EditMerchantForm />
    </main>
  </>
)

export default EditMerchantFormPage
