import React, { FC } from 'react'

import { Td, useToast, Text } from '@chakra-ui/react'

import {
  InvoiceListQuery,
  Invoices_Insert_Input,
  useUpdateInvoiceMutation,
} from 'src/generated/hasura'

import Editable from 'src/components/Editable'
import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

const Columns: FC<{
  isEditable: boolean
  invoice: InvoiceListQuery['invoices'][number]
  onInvoiceUpdate: (updatedInvoice: InvoiceListQuery['invoices'][number]) => void
}> = ({ isEditable, invoice, onInvoiceUpdate }) => {
  const toast = useToast()

  const [updateInvoice] = useUpdateInvoiceMutation({
    onCompleted({ update_invoices }) {
      if (!update_invoices) throw new Error()
      toast({ ...successToastContent, title: 'Invoice updated' })
      update_invoices.returning.map(onInvoiceUpdate)
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(set: Invoices_Insert_Input, id: number) {
    const [value] = Object.values(set)

    if (value === '') {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateInvoice({ variables: { _set: set, id: { _eq: id } } })
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
