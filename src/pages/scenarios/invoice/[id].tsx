import { FC, useState } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Head from 'next/head'

import {
  Box,
  SimpleGrid,
  Flex,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  useToast,
} from '@chakra-ui/react'

import easyinvoice, { InvoiceData } from 'easyinvoice'
import PdfImageViewer from 'scenarios/PdfImageViewer'

import { useScenarioQuery } from 'src/generated/graphql'

import prisma from 'src/lib/prisma'
import { errorToastContent } from 'src/lib/toastContent'

function base64toBlob(base64Data, contentType = 'application/pdf') {
  const sliceSize = 1024
  const byteCharacters = atob(base64Data)
  const bytesLength = byteCharacters.length
  const slicesCount = Math.ceil(bytesLength / sliceSize)
  const byteArrays = new Array(slicesCount)

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize
    const end = Math.min(begin + sliceSize, bytesLength)

    const bytes = new Array(end - begin)

    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0)
    }

    byteArrays[sliceIndex] = new Uint8Array(bytes)
  }

  return new Blob(byteArrays, {
    type: contentType,
  })
}

const data: InvoiceData = {
  // "documentTitle": "RECEIPT", //Defaults to INVOICE

  locale: 'de-DE',
  // Defaults to en-US. List of locales: https://datahub.io/core/language-codes/r/3.html

  taxNotation: 'vat', // or gst
  marginTop: 25,
  marginRight: 25,
  marginLeft: 25,
  marginBottom: 25,
  // logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png', // or base64
  // background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg', // or base64
  invoiceNumber: '2021.0001',
  invoiceDate: '1.1.2021',
  products: [
    {
      quantity: '2',
      description: 'Test1',
      tax: 6,
      price: 33.87,
    },
    {
      quantity: '4',
      description: 'Test2',
      tax: 21,
      price: 10.45,
    },
  ],
  // Used for translating the headers to your preferred language
  // Defaults to English. Below example is translated to Dutch
  // "translate": {
  //     "invoiceNumber": "Factuurnummer",
  //     "invoiceDate": "Factuurdatum",
  //     "products": "Producten",
  //     "quantity": "Aantal",
  //     "price": "Prijs",
  //     "subtotal": "Subtotaal",
  //     "total": "Totaal"
  // }
}

const CreateInvoice: FC<{ scenarioId: number }> = ({ scenarioId }) => {
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('')
  const toast = useToast()

  useScenarioQuery({
    variables: { where: { id: scenarioId } },
    onCompleted({ scenario }) {
      if (!scenario) {
        toast({ ...errorToastContent, title: 'could not find the scenario' })
        return
      }

      easyinvoice
        .createInvoice({
          ...data,
          bottomNotice: scenario?.notes,
          currency: scenario.currency,
          sender: {
            address: scenario.merchant.address,
            city: scenario.merchant.city,
            company: scenario.merchant.companyName,
            country: scenario.merchant.country,
            zip: scenario.merchant.postCode,
          },
          client: {
            address: scenario.client.address,
            city: scenario.client.city,
            company: scenario.client.name,
            country: scenario.client.country,
            zip: scenario.client.postCode,
          },
        })
        .then((r) => {
          const blob = base64toBlob(r.pdf)
          const blobUrl = URL.createObjectURL(blob)
          setPdfPreviewUrl(blobUrl)
        })
    },
  })

  function handleSubmit() {}

  return (
    <SimpleGrid my="10" columns={2} spacing={10}>
      <Box m="auto" w="100%">
        <PdfImageViewer url={pdfPreviewUrl} />
      </Box>

      <Flex direction="row">
        <form onSubmit={handleSubmit}>
          <Tabs isFitted variant="enclosed" colorScheme="teal">
            <TabList mb="1em">
              <Tab _focus={{ boxShadow: 'none' }}>Main</Tab>
              <Tab _focus={{ boxShadow: 'none' }}>Address</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>s</TabPanel>
            </TabPanels>
          </Tabs>
        </form>
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
