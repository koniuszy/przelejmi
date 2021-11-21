import React, { FC } from 'react'

import { Td, useToast } from '@chakra-ui/react'

import {
  PaginatedMerchantListQuery,
  MerchantUpdateInput,
  useUpdateMerchantMutation,
} from 'src/generated/graphql'

import Editable from 'src/components/Editable'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

const EditableColumns: FC<{
  isEditable: boolean
  merchant: PaginatedMerchantListQuery['merchantList'][number]
  onMerchantUpdate: (
    updatedMerchant: PaginatedMerchantListQuery['merchantList'][number] | null | undefined
  ) => void
}> = ({ isEditable, merchant, onMerchantUpdate }) => {
  const toast = useToast()

  const [updateMerchant] = useUpdateMerchantMutation({
    onCompleted({ updatedMerchant }) {
      toast({ ...successToastContent, title: 'Merchant updated' })
      onMerchantUpdate(updatedMerchant)
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(data: MerchantUpdateInput, id: number) {
    const [value] = Object.values(data)

    if (value === '' && data.vatId !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateMerchant({ variables: { data, id } })
  }

  return (
    <>
      <Td>
        <Editable
          defaultValue={merchant.companyName}
          isDisabled={!isEditable}
          onSubmit={(companyName) => handleUpdate({ companyName }, merchant.id)}
        />
      </Td>
      <Td>
        <Editable
          defaultValue={merchant.issuerName}
          isDisabled={!isEditable}
          onSubmit={(issuerName) => handleUpdate({ issuerName }, merchant.id)}
        />
      </Td>
      <Td>
        <Editable
          defaultValue={merchant.email}
          isDisabled={!isEditable}
          onSubmit={(email) => handleUpdate({ email }, merchant.id)}
        />
      </Td>
      <Td>
        <Editable
          defaultValue={merchant.bankName}
          isDisabled={!isEditable}
          onSubmit={(bankName) => handleUpdate({ bankName }, merchant.id)}
        />
      </Td>
    </>
  )
}

export default EditableColumns
