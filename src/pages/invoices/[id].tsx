import { FC, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Center, Spinner, Flex, SimpleGrid, Box, useToast } from '@chakra-ui/react'

import { Formik } from 'formik'
import InvoiceForm from 'invoices/InvoiceForm'
import PdfImageViewer from 'scenarios/PdfImageViewer'

import { InvoiceQuery, useInvoiceQuery, useUpdateInvoiceMutation } from 'src/generated/hasura'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

const CreateInvoice: FC<{ invoice: NonNullable<InvoiceQuery['invoices'][number]> }> = ({
  invoice,
}) => {
  const toast = useToast()
  const router = useRouter()

  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('')
  const [invoiceItems, setInvoiceItems] = useState(invoice.items)
  const [updateInvoice, { loading }] = useUpdateInvoiceMutation({
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
            updateInvoice({
              variables: {
                _set: {
                  ...invoice,
                  ...v,
                  // items: {
                  //   // @ts-ignore
                  //   createMany: { data: invoiceItems.filter((i) => i.quantity && i.price) },
                  // },
                  // @ts-ignore
                  // scenarioId: { connect: { id: invoice. } },
                },
              },
            })
          }
        >
          {(p) => (
            <InvoiceForm
              // @ts-ignore
              invoiceItems={invoiceItems}
              isLoadingPreview={isLoadingPreview}
              isValid={p.isValid}
              invoiceNumber={p.values.invoiceNumber}
              issueDate={p.values.issueDate}
              isSubmitting={loading}
              // @ts-ignore
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

type SSGProps = {
  invoiceId: number
}

const EditInvoiceFormPage: FC<SSGProps> = () => {
  const router = useRouter()
  const invoiceId = Number(router.query.id)

  const { data } = useInvoiceQuery({ variables: { id: { _eq: invoiceId } } })

  return (
    <>
      <Head>
        <title>Edit merchant | przelejmi</title>
      </Head>
      {!data?.invoices[0] ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <CreateInvoice invoice={data.invoices[0]} />
      )}
    </>
  )
}

export default EditInvoiceFormPage
