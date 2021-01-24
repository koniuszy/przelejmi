import React, { FC, useState } from 'react'

import { GetStaticProps } from 'next'

import NextImg from 'next/image'

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Grid,
  RadioGroup,
  Stack,
  Radio,
  Text,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'
import { useFormik } from 'formik'

import { OptimizedImg } from 'src/types'

type SSGProps = {
  calmInTrolleyImg: OptimizedImg
}

enum ClientType {
  COMPANY = 'Company',
  PERSON = 'Person',
}

type Form = {
  name: string
  address: string
  postAddress: string
  city: string
  country: string
  nip: number
}

const CreateClient: FC<SSGProps> = ({ calmInTrolleyImg }) => {
  const imgWidth = 500
  const [clientType, setClientType] = useState<ClientType>(ClientType.COMPANY)

  const { handleSubmit, errors, values, handleChange, isSubmitting, setValues } = useFormik<Form>({
    validateOnBlur: true,
    initialValues: {},
    onSubmit: (values) => {
      console.log(values)
    },
    validate: (values) => {
      //@ts-ignore
      const errors: Record<keyof Form, string> = {}

      if (values.name.length > 100) errors.name = 'Name should be shorter'
      if (isNaN(values.netPerOne) || values.netPerOne < 1) errors.netPerOne = 'Invalid value'

      return errors
    },
  })

  return (
    <Flex>
      <Box className="imgBox" position="relative" overflow="hidden" mr="100">
        <img
          aria-hidden="true"
          alt="placeholder"
          src={calmInTrolleyImg.base64}
          className="nextImgPlaceholder"
        />
        <NextImg
          src={calmInTrolleyImg.src}
          width={imgWidth}
          height={calmInTrolleyImg.ratio * imgWidth}
        />
      </Box>

      <form>
        <Flex direction="column">
          <RadioGroup value={clientType} onChange={(value) => setClientType(value as ClientType)}>
            <Text>Client type</Text>
            <Stack pt="3" spacing={5} direction="row">
              {Object.values(ClientType).map((value) => (
                <Radio cursor="pointer" colorScheme="green" value={value}>
                  {value}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          <FormControl mt="10" id="name" isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              name="name"
              placeholder="John Smith"
              onChange={handleChange}
              value={values.name}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl mt="10" id="address" isInvalid={!!errors.address}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              name="address"
              placeholder="John Smith"
              onChange={handleChange}
              value={values.address}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl mt="2" id="postAddress" isInvalid={!!errors.postAddress}>
            <FormLabel htmlFor="postAddress">Post address</FormLabel>
            <Input
              name="postAddress"
              placeholder="John Smith"
              onChange={handleChange}
              value={values.postAddress}
            />
            <FormErrorMessage>{errors.postAddress}</FormErrorMessage>
          </FormControl>

          <FormControl mt="2" id="city" isInvalid={!!errors.city}>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              name="city"
              placeholder="John Smith"
              onChange={handleChange}
              value={values.city}
            />
            <FormErrorMessage>{errors.country}</FormErrorMessage>
          </FormControl>

          <FormControl mt="2" id="country" isInvalid={!!errors.country}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              name="country"
              placeholder="John Smith"
              onChange={handleChange}
              value={values.country}
            />
            <FormErrorMessage>{errors.country}</FormErrorMessage>
          </FormControl>
        </Flex>
      </form>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  const src = '/calmInTrolley.jpg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)
  const base64 = await getBase64(img)

  return {
    props: {
      calmInTrolleyImg: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}
export default CreateClient
