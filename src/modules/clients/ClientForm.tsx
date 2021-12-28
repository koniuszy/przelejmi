import React, { FC, useState } from 'react'

import NextImage from 'next/image'

import {
  Flex,
  Button,
  RadioGroup,
  Stack,
  Radio,
  Text,
  SimpleGrid,
  Box,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Spacer,
} from '@chakra-ui/react'

import { Form, Formik } from 'formik'

import { FormField } from 'src/components/Form'
import { ClientType } from 'src/types'

import calmInTrolleyImg from './calmInTrolley.jpg'

type Form = {
  name: string
  address: string
  postCode: string
  city: string
  country: string
  vatId: string
}

const clientTypes: ClientType[] = ['Company', 'Person']

const ClientForm: FC<{
  isLoading: boolean
  initialValues: Form
  onSubmit: (values: Form & { clientType: ClientType }) => void
}> = ({ isLoading, onSubmit, initialValues }) => {
  const [clientType, setClientType] = useState<ClientType>('Company')

  return (
    <SimpleGrid my="10" columns={2} spacing={10}>
      <Box mx="auto" w="50%">
        <NextImage placeholder="blur" src={calmInTrolleyImg} />
      </Box>

      <Flex direction="row">
        <Formik
          validate={(values) => {
            const errors: Partial<Record<keyof Form, string>> = {}

            if (values.name.length > 100) errors.name = 'Name should be shorter'
            if (values.address.length > 100) errors.address = 'Address should be shorter'
            if (values.postCode.length > 10) errors.postCode = 'Post code should be shorter'
            if (values.city.length > 100) errors.city = 'City should be shorter'
            if (values.country.length > 100) errors.country = 'Country should be shorter'
            if (isNaN(Number(values.vatId.replace(/ /g, '')))) errors.vatId = 'NIP is invalid'

            return errors
          }}
          initialValues={initialValues}
          onSubmit={(v) => onSubmit({ ...v, clientType })}
        >
          {(formikProps) => (
            <Form>
              <Tabs isFitted variant="enclosed" colorScheme="teal">
                <TabList mb="1em">
                  <Tab _focus={{ boxShadow: 'none' }}>Main</Tab>
                  <Tab _focus={{ boxShadow: 'none' }}>Address</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <RadioGroup
                      value={clientType}
                      onChange={(value) => setClientType(value as ClientType)}
                    >
                      <Text fontWeight="500">Client type</Text>
                      <Stack pt="3" spacing={5} direction="row">
                        {clientTypes.map((value) => (
                          <Radio key={value} cursor="pointer" colorScheme="green" value={value}>
                            {value}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>

                    <Flex direction="row" mt="8">
                      <FormField isRequired id="name" label="Name" placeholder="John Smith" />
                      <Spacer ml="7" />
                      <FormField
                        isDisabled={clientType === 'Person'}
                        isRequired={clientType === 'Company'}
                        id="vatId"
                        label="VAT ID"
                        placeholder="12345678"
                      />
                    </Flex>
                  </TabPanel>

                  <TabPanel>
                    <Flex direction="row">
                      <FormField
                        isRequired
                        id="address"
                        label="Street name and number"
                        placeholder="Street 10/2"
                      />
                      <Spacer ml="7" />
                      <FormField isRequired id="postCode" label="Post code" placeholder="60-687" />
                    </Flex>

                    <Flex direction="row" mt="5">
                      <FormField isRequired id="city" label="City" placeholder="Poznań" />
                      <Spacer ml="7" />
                      <FormField isRequired id="country" label="Country" placeholder="Polska" />
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Flex direction="column">
                <Button
                  mt="10"
                  display="flex"
                  ml="auto"
                  mr={4}
                  type="submit"
                  colorScheme="teal"
                  disabled={!formikProps.isValid}
                  isLoading={isLoading}
                >
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </SimpleGrid>
  )
}

export default ClientForm
