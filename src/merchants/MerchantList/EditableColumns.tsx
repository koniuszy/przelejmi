import React, { FC } from 'react'

import { Td, useToast } from '@chakra-ui/react'

import { Merchant } from 'prisma/prisma-client'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import { useUpdateMerchantMutation } from 'src/generated/graphql'

import Editable from 'src/components/Editable'

const EditableColumns: FC<{
  isEditable: boolean
  merchant: Merchant
  onMerchantUpdate(updatedMerchant: Merchant): void
}> = ({ isEditable, merchant, onMerchantUpdate }) => {
  const toast = useToast()

  const [updateMerchant] = useUpdateMerchantMutation({
    onCompleted({ updatedMerchant }) {
      toast({ ...successToastContent, title: 'Merchant updated' })
      onMerchantUpdate(updatedMerchant as Merchant)
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(data: Partial<Merchant>, id: number) {
    const [value] = Object.values(data)

    if (value === '' && data.VATId !== value) {
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
      </Td>{' '}
    </>
  )
}

export default EditableColumns
