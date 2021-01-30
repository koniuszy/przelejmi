import React, { FC, useState } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'
import NextImg from 'next/image'

import {
  Box,
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
  useToast,
} from '@chakra-ui/react'

import { useMutation } from '@apollo/client'
import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'
import { Merchant } from '@prisma/client'
import { useFormik } from 'formik'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import { CREATE_MERCHANT_MUTATION } from 'src/graphql/mutations'
import { MERCHANTS_QUERY } from 'src/graphql/queries'
import { MerchantType, OptimizedImg } from 'src/types'

type SSGProps = {
  womanWithFoldersImg: OptimizedImg
}

type Form = {
  name: string
  address: string
  postCode: string
  city: string
  country: string
  nip: string
  bankName: string
  bankAccount: string
  email: string
}

const imgWidth = 500

const CreateMerchant: FC<SSGProps> = ({ womanWithFoldersImg }) => {
  const toast = useToast()
  const [createMerchant, { loading, client }] = useMutation<{ createdMerchant: Merchant }>(
    CREATE_MERCHANT_MUTATION,
    {
      onCompleted(response) {
        toast({
          ...successToastContent,
          title: 'Merchant created.',
        })

        const data = client.readQuery({ query: MERCHANTS_QUERY })
        if (!data) return

        client.writeQuery({
          query: MERCHANTS_QUERY,
          data: { ...data, merchantList: [...data.merchantList, response.createdMerchant] },
        })
      },
      onError(err) {
        console.error(err)
        toast(errorToastContent)
      },
    }
  )

  const { handleSubmit, errors, values, handleChange, isValid } = useFormik<Form>({
    validateOnBlur: true,
    initialValues: {
      name: '',
      address: '',
      postCode: '',
      city: '',
      country: '',
      nip: '',
      bankName: '',
      bankAccount: '',
      email: '',
    },
    onSubmit(values) {
      const { nip, ...data } = values
      createMerchant({
        variables: {
          data: { ...data, nip: Number(nip) },
        },
      })
    },
    validate(values) {
      //@ts-ignore
      const errors: Record<keyof Form, string> = {}

      if (values.name.length > 100) errors.name = 'Name should be shorter'
      if (values.address.length > 100) errors.address = 'Address should be shorter'
      if (values.postCode.length > 10) errors.postCode = 'Post code should be shorter'
      if (values.city.length > 100) errors.city = 'City should be shorter'
      if (values.country.length > 100) errors.country = 'Country should be shorter'
      if (values.bankName.length > 100) errors.bankName = 'Bank name should be shorter'
      if (values.bankAccount.length > 100) errors.bankAccount = 'Bank account should be shorter'
      if (values.email.length > 100) errors.email = 'Email should be shorter'
      if (isNaN(Number(values.nip.replace(/ /g, '')))) errors.nip = 'NIP is invalid'

      return errors
    },
  })

  return (
    <>
      <Head>
        <title>przelejmi | Create merchant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex>
        <Box className="nextImgBox">
          <img
            aria-hidden="true"
            alt="placeholder"
            className="nextImgPlaceholder"
            src={womanWithFoldersImg.base64}
          />
          <NextImg
            width={imgWidth}
            src={womanWithFoldersImg.src}
            objectFit="contain"
            objectPosition="center"
            height={womanWithFoldersImg.ratio * imgWidth}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <FormControl isRequired id="name" isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              name="name"
              placeholder="John Smith"
              onChange={handleChange}
              value={values.name}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired mt="2" id="country" isInvalid={!!errors.country}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              name="country"
              placeholder="Polska"
              onChange={handleChange}
              value={values.country}
            />
            <FormErrorMessage>{errors.country}</FormErrorMessage>
          </FormControl>

          <Flex direction="row">
            <FormControl isRequired ml="7" id="nip" isInvalid={!!errors.nip}>
              <FormLabel htmlFor="nip">NIP</FormLabel>
              <Input name="nip" placeholder="12345678" onChange={handleChange} value={values.nip} />
              <FormErrorMessage>{errors.nip}</FormErrorMessage>
            </FormControl>
          </Flex>

          <FormControl isRequired id="address" mt="5" isInvalid={!!errors.address}>
            <FormLabel htmlFor="address">Street name and number</FormLabel>
            <Input
              name="address"
              placeholder="Street 10/2"
              onChange={handleChange}
              value={values.address}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <Flex direction="row">
            <FormControl isRequired id="bankName" ml="7" isInvalid={!!errors.bankName}>
              <FormLabel htmlFor="bankName">Bank name</FormLabel>
              <Input
                name="bankName"
                placeholder="Polska"
                onChange={handleChange}
                value={values.bankName}
              />
              <FormErrorMessage>{errors.bankName}</FormErrorMessage>
            </FormControl>
          </Flex>
          <Flex direction="row">
            <FormControl isRequired mt="2" id="postCode" isInvalid={!!errors.postCode}>
              <FormLabel htmlFor="postCode">Post code</FormLabel>
              <Input
                name="postCode"
                placeholder="60-687"
                onChange={handleChange}
                value={values.postCode}
              />
              <FormErrorMessage>{errors.postCode}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired ml="7" id="bankAccount" isInvalid={!!errors.bankName}>
              <FormLabel htmlFor="bankAccount">Bank account</FormLabel>
              <Input
                name="bankAccount"
                placeholder="Polska"
                onChange={handleChange}
                value={values.bankAccount}
              />
              <FormErrorMessage>{errors.bankAccount}</FormErrorMessage>
            </FormControl>
          </Flex>

          <Flex direction="row">
            <FormControl isRequired mt="2" id="city" isInvalid={!!errors.city}>
              <FormLabel htmlFor="city">City</FormLabel>
              <Input name="city" placeholder="Poznań" onChange={handleChange} value={values.city} />
              <FormErrorMessage>{errors.country}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired ml="7" id="Email" isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                name="email"
                placeholder="Polska"
                onChange={handleChange}
                value={values.email}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
          </Flex>

          <Button mt="10" type="submit" colorScheme="teal" disabled={!isValid} isLoading={loading}>
            Submit
          </Button>
        </form>
      </Flex>
    </>
  )
}

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  const src = '/womanWithFolders.jpg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)
  const base64 = await getBase64(img)

  return {
    props: {
      womanWithFoldersImg: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}
export default CreateMerchant
