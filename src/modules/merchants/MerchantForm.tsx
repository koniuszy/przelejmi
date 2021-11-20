import React, { FC } from 'react'

import NextImage from 'next/image'

import {
  Flex,
  Button,
  Box,
  SimpleGrid,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  Spacer,
  TabPanel,
} from '@chakra-ui/react'

import { Form, Formik } from 'formik'

import { FormField } from 'src/components/Form'

import womanWithFoldersImg from './womanWithFolders.jpg'

type Form = {
  companyName: string
  address: string
  postCode: string
  city: string
  country: string
  vatId: string
  bankName: string
  bankAccountPln: string
  bankAccountEur: string
  email: string
  issuerName: string
}

const MerchantForm: FC<{
  isSubmitting: boolean
  initialValues: Form
  onSubmit: (values: Form) => void
}> = ({ onSubmit, isSubmitting, initialValues }) => (
  <SimpleGrid my="10" columns={2} spacing={10}>
    <Box mx="auto" w="50%">
      <NextImage placeholder="blur" src={womanWithFoldersImg} />
    </Box>

    <Flex direction="row">
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<Form> = {}

          if (values.companyName.length > 100) errors.companyName = 'Company name should be shorter'
          if (values.address.length > 100) errors.address = 'Address should be shorter'
          if (values.postCode.length > 10) errors.postCode = 'Post code should be shorter'
          if (values.city.length > 100) errors.city = 'City should be shorter'
          if (values.country.length > 100) errors.country = 'Country should be shorter'
          if (values.bankName.length > 100) errors.bankName = 'Bank name should be shorter'
          if (values.issuerName.length > 100) errors.issuerName = 'Issuer name should be shorter'

          const bankAccountPlnLength = (values.bankAccountPln ?? '').replace(/ /g, '').length
          if (bankAccountPlnLength < 26 || bankAccountPlnLength > 30)
            errors.bankAccountPln = 'Bank account should be between 26 and 30 digits'

          const bankAccountEurLength = (values.bankAccountEur ?? '').replace(/ /g, '').length
          if (bankAccountEurLength < 26 || bankAccountEurLength > 30)
            errors.bankAccountEur = 'Bank account should be between 26 and 30 digits'

          if (values.email.length > 100) errors.email = 'Email should be shorter'
          if (isNaN(Number(values.vatId.replace(/ /g, '')))) errors.vatId = 'Vat Id is invalid'

          return errors
        }}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <Form>
            <Tabs isFitted variant="enclosed" colorScheme="teal">
              <TabList mb="1em">
                <Tab _focus={{ boxShadow: 'none' }}>Main</Tab>
                <Tab _focus={{ boxShadow: 'none' }}>Address</Tab>
                <Tab _focus={{ boxShadow: 'none' }}>Bank</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex direction="row" mb={4}>
                    <FormField
                      isRequired
                      id="companyName"
                      label="Company name"
                      placeholder="John Smith"
                    />
                    <Spacer ml={7} />
                    <FormField isRequired id="vatId" label="VAT ID" placeholder="12345678" />
                  </Flex>
                  <FormField
                    isRequired
                    id="email"
                    label="Email"
                    placeholder="merchant@example.com"
                  />
                </TabPanel>
                <TabPanel>
                  <Flex mb={4} direction="row">
                    <FormField
                      isRequired
                      id="address"
                      label="Street name and number"
                      placeholder="Street 10/2"
                    />
                    <Spacer ml={7} />
                    <FormField isRequired id="country" label="Country" placeholder="Polska" />
                  </Flex>
                  <Flex direction="row">
                    <FormField isRequired id="city" label="City" placeholder="Poznań" />
                    <Spacer ml={7} />
                    <FormField isRequired id="postCode" label="Post code" placeholder="60-687" />
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="row" mb={4}>
                    <FormField isRequired id="bankName" label="Bank name" placeholder="Mbank" />
                    <Spacer ml={7} />
                    <FormField
                      isRequired
                      id="issuerName"
                      label="Issuer name"
                      placeholder="John Smith"
                    />
                  </Flex>
                  <FormField
                    isRequired
                    id="bankAccountPln"
                    label="Bank account in PLN"
                    placeholder="04 1140 2004 9892 3802 6728 1373"
                  />
                  <Spacer mt={4} />
                  <FormField
                    isRequired
                    id="bankAccountEur"
                    label="Bank account in EUR"
                    placeholder="04 1140 2004 9892 3802 6728 1373"
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Button
              display="flex"
              mt={10}
              ml="auto"
              mr={4}
              type="submit"
              colorScheme="teal"
              disabled={!formikProps.isValid}
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  </SimpleGrid>
)

export default MerchantForm
