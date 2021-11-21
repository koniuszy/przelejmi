import React, { FC } from 'react'

import { Td, useToast, Text } from '@chakra-ui/react'

import {
  PaginatedInvoiceListQuery,
  InvoiceUpdateInput,
  useUpdateInvoiceMutation,
} from 'src/generated/graphql'

import Editable from 'src/components/Editable'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

const Columns: FC<{
  isEditable: boolean
  invoice: PaginatedInvoiceListQuery['invoiceList'][number]
  onInvoiceUpdate: (
    updatedInvoice: PaginatedInvoiceListQuery['invoiceList'][number] | null | undefined
  ) => void
}> = ({ isEditable, invoice, onInvoiceUpdate }) => {
  const toast = useToast()

  const [updateInvoice] = useUpdateInvoiceMutation({
    onCompleted({ updatedInvoice }) {
      toast({ ...successToastContent, title: 'Invoice updated' })
      onInvoiceUpdate(updatedInvoice)
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(data: InvoiceUpdateInput, id: number) {
    const [value] = Object.values(data)

    if (value === '') {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateInvoice({ variables: { data, id } })
  }

  return (
    <>
      <Td>
        <Editable
          defaultValue={invoice.invoiceNumber}
          isDisabled={!isEditable}
          onSubmit={(invoiceNumber) => handleUpdate({ invoiceNumber }, invoice.id)}
        />
      </Td>
      <Td>
        <Editable
          defaultValue={invoice.issueDate}
          isDisabled={!isEditable}
          onSubmit={(issueDate) => handleUpdate({ issueDate }, invoice.id)}
        />
      </Td>
      <Td>
        <Text>
          {invoice.items.reduce((acc, i) => acc + i.price, 0)} {invoice.scenario.currency}
        </Text>
      </Td>
      <Td>
        <Text>{invoice.scenario.client.name}</Text>
      </Td>
      <Td>
        <Text>{invoice.scenario.merchant.companyName}</Text>
      </Td>
    </>
  )
}

export default Columns
