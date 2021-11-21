import React, { FC, useState } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Box, SimpleGrid, Flex, useToast } from '@chakra-ui/react'

import { Formik } from 'formik'
import CreateInvoiceForm from 'scenarios/CreateInvoiceForm'
import { getBusinessHoursInCurrentMonth } from 'scenarios/CreateInvoiceForm/helpers'
import PdfImageViewer from 'scenarios/PdfImageViewer'

import {
  InvoiceItemCreateManyInvoiceInput,
  useCreateInvoiceMutation,
  Vat,
} from 'src/generated/graphql'

import prisma from 'src/lib/prisma'
import { errorToastContent, successToastContent } from 'src/lib/toastContent'

const CreateInvoice: FC<{ scenarioId: number }> = ({ scenarioId }) => {
  const toast = useToast()
  const router = useRouter()

  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('')
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItemCreateManyInvoiceInput[]>(() => {
    const initialArray = new Array(5)
      .fill(null)
      .map(() => ({ name: '', price: 0, quantity: 0, vat: Vat.Percent_23 }))

    return [
      {
        name: 'Services',
        price: 100,
        quantity: getBusinessHoursInCurrentMonth(),
        vat: Vat.Percent_23,
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
                data: {
                  ...v,
                  items: {
                    createMany: { data: invoiceItems.filter((i) => i.quantity && i.price) },
                  },
                  scenario: { connect: { id: scenarioId } },
                },
              },
            })
          }
        >
          {(p) => (
            <CreateInvoiceForm
              invoiceItems={invoiceItems}
              isLoadingPreview={isLoadingPreview}
              isValid={p.isValid}
              invoiceNumber={p.values.invoiceNumber}
              issueDate={p.values.issueDate}
              isCreating={loading}
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
  scenarioId: number
}

const CreateInvoicePage: NextPage<SSGProps> = (ssgProps) => (
  <>
    <Head>
      <title>Create invoice | przelejmi</title>
    </Head>

    <main>
      <CreateInvoice scenarioId={ssgProps.scenarioId} />
    </main>
  </>
)

type Params = { id: string }

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const idList = await prisma.scenario.findMany({ select: { id: true } })

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
      scenarioId: Number(params?.id),
    },
  }
}

export default CreateInvoicePage
