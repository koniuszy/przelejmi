import React, { FC } from 'react'

import {
  Flex,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  useToast,
  Spacer,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Divider,
} from '@chakra-ui/react'

import easyinvoice from 'easyinvoice'
import { Form } from 'formik'

import {
  Currency,
  InvoiceItemCreateManyInvoiceInput,
  ScenarioQuery,
  useScenarioQuery,
  Vat,
} from 'src/generated/graphql'

import { FormField } from 'src/components/Form'
import { errorToastContent } from 'src/lib/toastContent'

import { mapVatToNumber, base64toBlob } from './helpers'

const CreateInvoiceForm: FC<{
  scenarioId: number
  isLoadingPreview: boolean
  onLoadingPreview: (v: boolean) => void
  onPreviewPdfChange: (url: string) => void
  isCreating: boolean
  issueDate: string
  invoiceNumber: string
  isValid: boolean
  invoiceItems: InvoiceItemCreateManyInvoiceInput[]
  onInvoiceItemsChange: (i: InvoiceItemCreateManyInvoiceInput[]) => void
}> = ({
  scenarioId,
  onPreviewPdfChange,
  onLoadingPreview,
  isLoadingPreview,
  isCreating,
  issueDate,
  invoiceNumber,
  isValid,
  invoiceItems,
  onInvoiceItemsChange,
}) => {
  const toast = useToast()

  async function handlePreviewInvoiceCreate({
    scenario,
  }: {
    scenario: NonNullable<ScenarioQuery['scenario']>
  }) {
    onLoadingPreview(true)
    const { pdf } = await easyinvoice.createInvoice({
      // logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png', // or base64
      // background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg', // or base64
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      documentTitle: 'INVOICE',
      // Defaults to en-US. List of locales: https://datahub.io/core/language-codes/r/3.html
      // locale: 'de-DE',
      taxNotation: 'vat', // or gst
      bottomNotice: scenario.notes,
      currency: scenario.currency,
      invoiceNumber: invoiceNumber,
      invoiceDate: issueDate,
      translate: {
        // invoiceNumber: 'Invoice ID / Numer faktury',
        // invoiceDate: 'Date / Data',
        // products: 'Producten',
        // quantity: 'Aantal',
        // price: 'Prijs',
        // subtotal: 'Subtotaal',
        // total: 'Totaal',
      },
      products: invoiceItems
        .filter((i) => i.quantity || i.price || i.name)
        .map((i) => ({
          quantity: String(i.quantity),
          description: i.name,
          tax: mapVatToNumber(i.vat),
          price: i.price,
        })),
      sender: {
        address: scenario.merchant.address,
        city: scenario.merchant.city,
        company: scenario.merchant.companyName,
        country: scenario.merchant.country,
        zip: scenario.merchant.postCode,
        custom1: scenario.merchant.bankName,
        custom2:
          scenario.currency === Currency.Eur
            ? scenario.merchant.bankAccountEur || 'Missing bank account in Euro!'
            : scenario.merchant.bankAccountPln,
      },
      client: {
        company: scenario.client.name,
        address: scenario.client.address,
        city: scenario.client.city,
        country: scenario.client.country,
        zip: scenario.client.postCode,
      },
    })

    const blob = base64toBlob(pdf)
    const blobUrl = URL.createObjectURL(blob)
    onPreviewPdfChange(blobUrl)
  }

  const { data } = useScenarioQuery({
    variables: { where: { id: scenarioId } },
    onCompleted({ scenario }) {
      if (!scenario) {
        toast({ ...errorToastContent, title: 'could not find the scenario' })
        return
      }

      handlePreviewInvoiceCreate({ scenario })
    },
  })

  return (
    <Form>
      <Tabs isFitted variant="enclosed" colorScheme="teal">
        <TabList mb="1em">
          <Tab _focus={{ boxShadow: 'none' }}>Main</Tab>
          <Tab _focus={{ boxShadow: 'none' }}>Product list</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex mb={4}>
              <FormField
                isRequired
                id="invoiceNumber"
                label="Invoice number"
                placeholder="1/12/2023"
              />
              <Spacer ml={7} />
              <FormField isRequired id="issueDate" label="Issue date" placeholder="" />
            </Flex>
          </TabPanel>

          <TabPanel maxH={400} overflow="auto">
            {invoiceItems.map((item, index) => {
              function handleChange(i: Partial<typeof invoiceItems[number]>) {
                onInvoiceItemsChange(
                  invoiceItems.map((prev, ix) => (ix === index ? { ...prev, ...i } : prev))
                )
              }

              return (
                <React.Fragment key={index}>
                  <Flex mb={4}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        value={item.name || ''}
                        placeholder="Product name"
                        onChange={(e) => handleChange({ name: e.target.value })}
                      />
                    </FormControl>
                    <Spacer ml={7} />
                    <FormControl>
                      <FormLabel>Quantity</FormLabel>
                      <Input
                        type="number"
                        value={item.quantity || ''}
                        placeholder="150"
                        onChange={(e) => {
                          const quantity = Number(e.target.value)
                          if (isNaN(quantity)) return
                          handleChange({ quantity: Number(e.target.value) })
                        }}
                      />
                    </FormControl>
                  </Flex>

                  <Flex mb={4} key={index}>
                    <FormControl>
                      <FormLabel>Price</FormLabel>
                      <Input
                        type="number"
                        value={item.price || ''}
                        placeholder="30"
                        onChange={(e) => {
                          const quantity = Number(e.target.value)
                          if (isNaN(quantity)) return
                          handleChange({ price: Number(e.target.value) })
                        }}
                      />
                    </FormControl>
                    <Spacer ml={7} />
                    <FormControl>
                      <FormLabel>Tax</FormLabel>
                      <Select
                        value={item.vat}
                        onChange={(e) => handleChange({ vat: e.target.value as Vat })}
                      >
                        {Object.values(Vat).map((i) => (
                          <option key={1} value={i}>
                            {i}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Flex>
                  <Divider my={5} h={2} />
                </React.Fragment>
              )
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex mt={10}>
        <Button
          ml="auto"
          display="flex"
          mr={4}
          isLoading={isLoadingPreview}
          onClick={() => {
            if (data?.scenario) handlePreviewInvoiceCreate({ scenario: data.scenario })
          }}
        >
          Refresh
        </Button>

        <Button type="submit" colorScheme="teal" mr={4} disabled={!isValid} isLoading={isCreating}>
          Submit
        </Button>
      </Flex>
    </Form>
  )
}

export default CreateInvoiceForm
