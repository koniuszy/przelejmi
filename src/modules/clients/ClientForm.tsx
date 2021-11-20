import React, { FC, useState } from 'react'

import NextImage from 'next/image'

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
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
} from '@chakra-ui/react'

import { useFormik } from 'formik'

import { FormField } from 'src/components/Form'
import { ClientType } from 'src/types'

import calmInTrolleyImg from './calmInTrolley.jpg'

type Form = {
  name: string
  address: string
  postCode: string
  city: string
  country: string
  VATId: string
}

const ClientForm: FC<{
  isLoading: boolean
  initialValues: Form
  onSubmit: (values: Form & { clientType: ClientType }) => void
}> = ({ isLoading, onSubmit, initialValues }) => {
  const [clientType, setClientType] = useState<ClientType>(ClientType.company)

  const { handleSubmit, errors, values, handleChange, isValid } = useFormik<Form>({
    initialValues,
    onSubmit(values) {
      onSubmit({ ...values, clientType })
    },
    validate(values) {
      const errors: Partial<Record<keyof Form, string>> = {}

      if (values.name.length > 100) errors.name = 'Name should be shorter'
      if (values.address.length > 100) errors.address = 'Address should be shorter'
      if (values.postCode.length > 10) errors.postCode = 'Post code should be shorter'
      if (values.city.length > 100) errors.city = 'City should be shorter'
      if (values.country.length > 100) errors.country = 'Country should be shorter'
      if (isNaN(Number(values.VATId.replace(/ /g, '')))) errors.VATId = 'NIP is invalid'

      return errors
    },
  })

  return (
    <SimpleGrid my="10" columns={2} spacing={10}>
      <Box mx="auto" w="50%">
        <NextImage placeholder="blur" src={calmInTrolleyImg} />
      </Box>

      <Flex direction="row">
        <form onSubmit={handleSubmit}>
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
                    {Object.values(ClientType).map((value) => (
                      <Radio key={value} cursor="pointer" colorScheme="green" value={value}>
                        {value}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>

                <Flex direction="row" mt="8">
                  <FormField
                    id="name"
                    label="Name"
                    placeholder="JohnSmith"
                    error={errors.name}
                    value={values.name}
                    formControl={{ isRequired: true }}
                    onChange={handleChange}
                  />

                  <FormControl
                    ml="7"
                    id="VATId"
                    isInvalid={!!errors.VATId}
                    isRequired={clientType === ClientType.company}
                  >
                    <FormLabel htmlFor="VATId">NIP</FormLabel>
                    <Input
                      disabled={clientType !== ClientType.company}
                      name="VATId"
                      placeholder="12345678"
                      value={clientType === ClientType.company ? values.VATId : ''}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.VATId}</FormErrorMessage>
                  </FormControl>
                </Flex>
              </TabPanel>

              <TabPanel>
                <Flex direction="row">
                  <FormControl isRequired id="address" isInvalid={!!errors.address}>
                    <FormLabel htmlFor="address">Street name and number</FormLabel>
                    <Input
                      name="address"
                      placeholder="Street 10/2"
                      value={values.address}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired ml="7" id="postCode" isInvalid={!!errors.postCode}>
                    <FormLabel htmlFor="postCode">Post code</FormLabel>
                    <Input
                      name="postCode"
                      placeholder="60-687"
                      value={values.postCode}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.postCode}</FormErrorMessage>
                  </FormControl>
                </Flex>

                <Flex direction="row" mt="5">
                  <FormControl isRequired id="city" isInvalid={!!errors.city}>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input
                      name="city"
                      placeholder="Poznań"
                      value={values.city}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.country}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired ml="7" id="country" isInvalid={!!errors.country}>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <Input
                      name="country"
                      placeholder="Polska"
                      value={values.country}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.country}</FormErrorMessage>
                  </FormControl>
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
              disabled={!isValid}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </SimpleGrid>
  )
}

export default ClientForm
