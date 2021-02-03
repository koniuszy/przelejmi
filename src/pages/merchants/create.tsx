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

import { useCreateMerchantMutation, PaginatedMerchantListDocument } from 'src/generated/graphql'
import { OptimizedImg } from 'src/types'

import { PER_PAGE } from './index'

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
  const [createMerchant, { loading, client }] = useCreateMerchantMutation({
    onCompleted(response) {
      toast({
        ...successToastContent,
        title: 'Merchant created.',
      })

      const data = client.readQuery({ query: PaginatedMerchantListDocument })
      if (!data) {
        client
          .query({
            query: PaginatedMerchantListDocument,
            variables: { skip: 0, take: PER_PAGE },
          })
          .then((res) => {
            if (!res.data.merchantList.length) return
            client.writeQuery({
              query: PaginatedMerchantListDocument,
              data: { ...res, merchantList: [...res.data.merchantList, response.createdMerchant] },
            })
          })
        return
      }
      client.writeQuery({
        query: PaginatedMerchantListDocument,
        data: { ...data, merchantList: [...data.merchantList, response.createdMerchant] },
      })
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  const { handleSubmit, errors, values, handleChange, isValid } = useFormik<Form>({
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

      if (values.companyName.length > 100) errors.companyName = 'Company name should be shorter'
      if (values.address.length > 100) errors.address = 'Address should be shorter'
      if (values.postCode.length > 10) errors.postCode = 'Post code should be shorter'
      if (values.city.length > 100) errors.city = 'City should be shorter'
      if (values.country.length > 100) errors.country = 'Country should be shorter'
      if (values.bankName.length > 100) errors.bankName = 'Bank name should be shorter'
      if (values.issuerName.length > 100) errors.issuerName = 'Issuer name should be shorter'
      if (values.bankAccountPln.length < 26 || values.bankAccountPln.length > 30)
        errors.bankAccountPln = 'Bank account should be between 26 and 30 digits'
      if (values.bankAccountEur.length < 26 || values.bankAccountEur.length > 30)
        errors.bankAccountEur = 'Bank account should be between 26 and 30 digits'
      if (values.email.length > 100) errors.email = 'Email should be shorter'
      if (isNaN(Number(values.nip.replace(/ /g, '')))) errors.nip = 'NIP is invalid'

      return errors
    },
  })

  return (
    <>
      <Head>
        <title>przelejmi | Create merchant</title>
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
                value={values.companyName}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.companyName}</FormErrorMessage>
            </FormControl>

            <Flex direction="row">
              <FormControl isRequired mt="5" id="nip" isInvalid={!!errors.nip}>
                <FormLabel htmlFor="nip">NIP</FormLabel>
                <Input
                  name="nip"
                  placeholder="12345678"
                  value={values.nip}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.nip}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired mt="5" ml="7" id="country" isInvalid={!!errors.country}>
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

            <FormControl isRequired id="address" mt="5" isInvalid={!!errors.address}>
              <FormLabel htmlFor="address">Street name and number</FormLabel>
              <Input
                name="address"
                placeholder="Street 10/2"
                value={values.address}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.address}</FormErrorMessage>
            </FormControl>

            <Flex direction="row">
              <FormControl isRequired mt="4" id="city" isInvalid={!!errors.city}>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  name="city"
                  placeholder="Poznań"
                  value={values.city}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.country}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired mt="4" ml="7" id="postCode" isInvalid={!!errors.postCode}>
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

            <Flex direction="row">
              <FormControl isRequired id="bankName" mt="4" isInvalid={!!errors.bankName}>
                <FormLabel htmlFor="bankName">Bank name</FormLabel>
                <Input
                  name="bankName"
                  placeholder="Mbank"
                  value={values.bankName}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.bankName}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired id="issuerName" mt="4" ml="7" isInvalid={!!errors.issuerName}>
                <FormLabel htmlFor="issuerNAme">Issuer name</FormLabel>
                <Input
                  name="issuerName"
                  placeholder="John Smith"
                  value={values.issuerName}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.issuerName}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl isRequired mt="4" id="bankAccount" isInvalid={!!errors.bankAccountPln}>
              <FormLabel htmlFor="bankAccount">Bank account in PLN</FormLabel>
              <Input
                name="bankAccountPln"
                placeholder="04 1140 2004 9892 3802 6728 1373"
                value={values.bankAccountPln}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.bankAccountPln}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt="4" id="bankAccountEur" isInvalid={!!errors.bankAccountEur}>
              <FormLabel htmlFor="bankAccountEur">Bank account in EUR</FormLabel>
              <Input
                name="bankAccountEur"
                placeholder="PL 04 1140 2004 9892 3802 6728 1373"
                value={values.bankAccountEur}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.bankAccountEur}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt="4" id="Email" isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                name="email"
                placeholder="merchant@example.com"
                value={values.email}
                onChange={handleChange}
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
