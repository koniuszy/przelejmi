import React, { FC } from 'react'

import { useToast } from '@chakra-ui/react'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  useCreateMerchantMutation,
  PaginatedMerchantListDocument,
  MerchantListDocument,
} from 'src/generated/graphql'
import { OptimizedImg } from 'src/types'

import MerchantForm from 'src/components/MerchantForm'

import { PER_PAGE } from './MerchantList'

const CreateMerchantForm: FC<{
  womanWithFoldersImg: OptimizedImg
}> = ({ womanWithFoldersImg }) => {
  const toast = useToast()

  const [createMerchant, { loading }] = useCreateMerchantMutation({
    refetchQueries: [
      { query: PaginatedMerchantListDocument, variables: { take: PER_PAGE, skip: 0 } },
      { query: MerchantListDocument },
    ],
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
