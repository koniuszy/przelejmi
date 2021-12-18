import { FC, useState } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Center, Spinner, Flex, SimpleGrid, Box, useToast } from '@chakra-ui/react'

import { Formik } from 'formik'
import InvoiceForm from 'invoices/InvoiceForm'
import PdfImageViewer from 'scenarios/PdfImageViewer'

import { InvoiceQuery, useInvoiceQuery, useUpdateInvoiceMutation } from 'src/generated/graphql'

import prisma from 'src/lib/prisma'
import { errorToastContent, successToastContent } from 'src/lib/toastContent'

const CreateInvoice: FC<{ invoice: NonNullable<InvoiceQuery['invoice']> }> = ({ invoice }) => {
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
                data: {
                  ...v,
                  items: {
                    // @ts-ignore
                    createMany: { data: invoiceItems.filter((i) => i.quantity && i.price) },
                  },
                  // @ts-ignore
                  scenario: { connect: { id: scenarioId } },
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

const EditInvoiceFormPage: FC<SSGProps> = (props) => {
  const route = useRouter()

  const { data } = useInvoiceQuery({ variables: { id: props.invoiceId } })

  return (
    <>
      <Head>
        <title>Edit merchant | przelejmi</title>
      </Head>
      <main>
        {route.isFallback || !data?.invoice ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <CreateInvoice invoice={data.invoice} />
        )}
      </main>
    </>
  )
}

type Params = { id: string }

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const idList = await prisma.invoice.findMany({ select: { id: true } })

  const paths = idList.map(({ id }) => ({
    params: { id: id.toString() },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<SSGProps, Params> = async ({ params }) => {
  return {
    props: {
      invoiceId: Number(params?.id),
    },
  }
}

export default EditInvoiceFormPage
