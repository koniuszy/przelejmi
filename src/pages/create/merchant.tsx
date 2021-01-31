import React, { FC } from 'react'

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
  useToast,
} from '@chakra-ui/react'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'
import { useFormik } from 'formik'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import { useCreateOneMerchantMutation, GetMerchantsDocument } from 'src/generated/graphql'
import { OptimizedImg } from 'src/types'

type SSGProps = {
  womanWithFoldersImg: OptimizedImg
}

type Form = {
  companyName: string
  address: string
  postCode: string
  city: string
  country: string
  nip: string
  bankName: string
  bankAccountPln: string
  bankAccountEur: string
  email: string
  issuerName: string
}

const imgWidth = 500

const CreateMerchant: FC<SSGProps> = ({ womanWithFoldersImg }) => {
  const toast = useToast()
  const [createMerchant, { loading }] = useCreateOneMerchantMutation({
    onCompleted(response) {
      toast({
        ...successToastContent,
        title: 'Merchant created.',
      })
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  const { handleSubmit, errors, values, handleChange, isValid } = useFormik<Form>({
    validateOnBlur: true,
    initialValues: {
      companyName: '',
      address: '',
      postCode: '',
      city: '',
      country: '',
      nip: '',
      bankAccountPln: '',
      bankAccountEur: '',
      bankName: '',
      email: '',
      issuerName: '',
    },
    onSubmit(values) {
      createMerchant({
        variables: {
          data: values,
        },
      })
    },
    validate(values) {
      //@ts-ignore
      const errors: Record<keyof Form, string> = {}

      if (values.companyName.length > 100) errors.companyName = 'Name should be shorter'
      if (values.address.length > 100) errors.address = 'Address should be shorter'
      if (values.postCode.length > 10) errors.postCode = 'Post code should be shorter'
      if (values.city.length > 100) errors.city = 'City should be shorter'
      if (values.country.length > 100) errors.country = 'Country should be shorter'
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

        <Flex direction="row">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired id="companyName" isInvalid={!!errors.companyName}>
              <FormLabel htmlFor="companyName">Company name</FormLabel>
              <Input
                name="companyName"
                placeholder="John Smith"
                onChange={handleChange}
                value={values.companyName}
              />
              <FormErrorMessage>{errors.companyName}</FormErrorMessage>
            </FormControl>

            <Flex direction="row">
              <FormControl isRequired mt="5" id="nip" isInvalid={!!errors.nip}>
                <FormLabel htmlFor="nip">NIP</FormLabel>
                <Input
                  name="nip"
                  placeholder="12345678"
                  onChange={handleChange}
                  value={values.nip}
                />
                <FormErrorMessage>{errors.nip}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired mt="5" ml="7" id="country" isInvalid={!!errors.country}>
                <FormLabel htmlFor="country">Country</FormLabel>
                <Input
                  name="country"
                  placeholder="Polska"
                  onChange={handleChange}
                  value={values.country}
                />
                <FormErrorMessage>{errors.country}</FormErrorMessage>
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
              <FormErrorMessage>{errors.address}</FormErrorMessage>
            </FormControl>

            <Flex direction="row">
              <FormControl isRequired mt="4" id="city" isInvalid={!!errors.city}>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  name="city"
                  placeholder="Poznań"
                  onChange={handleChange}
                  value={values.city}
                />
                <FormErrorMessage>{errors.country}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired mt="4" ml="7" id="postCode" isInvalid={!!errors.postCode}>
                <FormLabel htmlFor="postCode">Post code</FormLabel>
                <Input
                  name="postCode"
                  placeholder="60-687"
                  onChange={handleChange}
                  value={values.postCode}
                />
                <FormErrorMessage>{errors.postCode}</FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex direction="row">
              <FormControl isRequired id="bankName" mt="4" isInvalid={!!errors.bankName}>
                <FormLabel htmlFor="bankName">Bank name</FormLabel>
                <Input
                  name="bankName"
                  placeholder="Mbank"
                  onChange={handleChange}
                  value={values.bankName}
                />
                <FormErrorMessage>{errors.bankName}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired id="issuerName" mt="4" ml="7" isInvalid={!!errors.issuerName}>
                <FormLabel htmlFor="issuerNAme">Issuer name</FormLabel>
                <Input
                  name="issuerName"
                  placeholder="John Smith"
                  onChange={handleChange}
                  value={values.issuerName}
                />
                <FormErrorMessage>{errors.issuerName}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl isRequired mt="4" id="bankAccountPln" isInvalid={!!errors.bankAccountPln}>
              <FormLabel htmlFor="bankAccountPln">Bank account in PLN</FormLabel>
              <Input
                name="bankAccountPln"
                placeholder="04 1140 2004 9892 3802 6728 1373"
                onChange={handleChange}
                value={values.bankAccountPln}
              />
              <FormErrorMessage>{errors.bankAccountPln}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt="4" id="bankAccountEur" isInvalid={!!errors.bankAccountEur}>
              <FormLabel htmlFor="bankAccountEur">Bank account in EUR</FormLabel>
              <Input
                name="bankAccountEur"
                placeholder="PL 04 1140 2004 9892 3802 6728 1373"
                onChange={handleChange}
                value={values.bankAccountEur}
              />
              <FormErrorMessage>{errors.bankAccountEur}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt="4" id="Email" isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                name="email"
                placeholder="merchant@example.com"
                onChange={handleChange}
                value={values.email}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <Button
              mt="10"
              type="submit"
              colorScheme="teal"
              width="100%"
              disabled={!isValid}
              isLoading={loading}
            >
              Submit
            </Button>
          </form>
        </Flex>
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
