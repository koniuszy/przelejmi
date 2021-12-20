import React, { FC, useState } from 'react'

import { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Box, SimpleGrid, Flex, useToast } from '@chakra-ui/react'

import { Formik } from 'formik'
import InvoiceForm from 'invoices/InvoiceForm'
import { getBusinessHoursInCurrentMonth } from 'invoices/InvoiceForm/helpers'
import PdfImageViewer from 'scenarios/PdfImageViewer'

import { Invoice_Items_Insert_Input, useCreateInvoiceMutation } from 'src/generated/hasura'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

const CreateInvoice: FC = () => {
  const toast = useToast()
  const router = useRouter()
  const scenarioId = Number(router.query.id)

  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('')
  const [invoiceItems, setInvoiceItems] = useState<Invoice_Items_Insert_Input[]>(() => {
    const initialArray = new Array(5)
      .fill(null)
      .map(() => ({ name: '', price: 0, quantity: 0, vat: 'Vat.Percent_23' }))

    return [
      {
        name: 'Services',
        price: 100,
        quantity: getBusinessHoursInCurrentMonth(),
        vat: 'Vat.Percent_23',
      },
      ...initialArray,
    ]
  })
  const [createInvoice, { loading }] = useCreateInvoiceMutation({
    onCompleted() {
      toast({
        ...successToastContent,
        title: 'Invoice created.',
      })
      router.push('/invoices')
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })
  const [isLoadingPreview, setIsLoadingPreview] = useState(true)

  const invoiceOrder = 1
  return (
    <SimpleGrid my="10" columns={2} spacing={10}>
      <Box m="auto" w="100%">
        <PdfImageViewer url={pdfPreviewUrl} onLoaded={() => setIsLoadingPreview(false)} />
      </Box>

      <Flex direction="row">
        <Formik
          initialValues={{
            invoiceNumber: new Date(new Date().setDate(invoiceOrder)).toLocaleDateString(),
            issueDate: new Date().toLocaleDateString(),
          }}
          onSubmit={(v) =>
            createInvoice({
              variables: {
                object: {
                  ...v,
                  items: {
                    data: invoiceItems.filter((i) => i.quantity && i.price),
                  },
                  scenario: { data: { id: scenarioId } },
                },
              },
            })
          }
        >
          {(p) => (
            <InvoiceForm
              invoiceItems={invoiceItems}
              isLoadingPreview={isLoadingPreview}
              isValid={p.isValid}
              invoiceNumber={p.values.invoiceNumber}
              issueDate={p.values.issueDate}
              isSubmitting={loading}
              scenarioId={scenarioId}
              onInvoiceItemsChange={setInvoiceItems}
              onLoadingPreview={setIsLoadingPreview}
              onPreviewPdfChange={setPdfPreviewUrl}
            />
          )}
        </Formik>
      </Flex>
    </SimpleGrid>
  )
}

const CreateInvoicePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create invoice | przelejmi</title>
      </Head>

      <main>
        <CreateInvoice />
      </main>
    </>
  )
}

export default CreateInvoicePage
