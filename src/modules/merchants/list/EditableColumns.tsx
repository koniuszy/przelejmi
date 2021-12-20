import React, { FC } from 'react'

import { Td, useToast } from '@chakra-ui/react'

import {
  MerchantListQuery,
  Merchants_Set_Input,
  useUpdateMerchantMutation,
} from 'src/generated/hasura'

import Editable from 'src/components/Editable'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

const EditableColumns: FC<{
  isEditable: boolean
  merchant: MerchantListQuery['merchants'][number]
  onMerchantUpdate: (updatedMerchant: MerchantListQuery['merchants'][number]) => void
}> = ({ isEditable, merchant, onMerchantUpdate }) => {
  const toast = useToast()

  const [updateMerchant] = useUpdateMerchantMutation({
    onCompleted({ update_merchants }) {
      if (!update_merchants) throw new Error()
      toast({ ...successToastContent, title: 'Merchant updated' })
      update_merchants.returning.map((i) => onMerchantUpdate({ ...merchant, ...i }))
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(set: Merchants_Set_Input, id: number) {
    const [value] = Object.values(set)

    if (value === '' && set.vatId !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateMerchant({ variables: { where: { id: { _eq: id } }, _set: set } })
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
