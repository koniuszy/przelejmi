import React, { FC } from 'react'

import { useToast } from '@chakra-ui/react'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  useUpdateMerchantMutation,
  useMerchantQuery,
  PaginatedMerchantListDocument,
} from 'src/generated/graphql'
import { OptimizedImg } from 'src/types'

import MerchantForm from 'src/components/MerchantForm'

import { PER_PAGE } from './MerchantList'

const EditMerchantForm: FC<{
  womanWithFoldersImg: OptimizedImg
  merchantId: number
}> = ({ merchantId, womanWithFoldersImg }) => {
  const { data, updateQuery } = useMerchantQuery({ variables: { where: { id: merchantId } } })

  const toast = useToast()

  const [updateMerchant, { loading }] = useUpdateMerchantMutation({
    refetchQueries: [
      { query: PaginatedMerchantListDocument, variables: { take: PER_PAGE, skip: 0 } },
    ],
    onCompleted({ updatedMerchant }) {
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((p) => ({ ...p, updatedMerchant }))
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
          optimizedImg={womanWithFoldersImg}
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
      optimizedImg={womanWithFoldersImg}
      initialValues={{ ...data.merchant, bankAccountEur: data.merchant.bankAccountEur ?? '' }}
      onSubmit={(values) => updateMerchant({ variables: { data: values, id: merchantId } })}
    />
  )
}

export default EditMerchantForm
