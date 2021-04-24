import React, { FC } from 'react'

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
} from '@chakra-ui/react'

import { useFormik } from 'formik'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  useCreateMerchantMutation,
  PaginatedMerchantListDocument,
  PaginatedMerchantListQuery,
} from 'src/generated/graphql'
import { OptimizedImg } from 'src/types'

import BlurredImg from 'src/components/BlurredImg'

import { PER_PAGE } from './MerchantTable'

type Form = {
  companyName: string
  address: string
  postCode: string
  city: string
  country: string
  VATId: string
  bankName: string
  bankAccountPln: string
  bankAccountEur: string
  email: string
  issuerName: string
}

const CreateMerchantForm: FC<{
  womanWithFoldersImg: OptimizedImg
}> = ({ womanWithFoldersImg }) => {
  const toast = useToast()
  const [createMerchant, { loading, client }] = useCreateMerchantMutation({
    onCompleted({ createdMerchant }) {
      toast({
        ...successToastContent,
        title: 'Merchant created.',
      })

      const data = client.readQuery<PaginatedMerchantListQuery>({
        query: PaginatedMerchantListDocument,
        variables: { take: PER_PAGE, skip: 0 },
      })

      if (data) {
        client.writeQuery<PaginatedMerchantListQuery>({
          query: PaginatedMerchantListDocument,
          variables: { skip: 0, take: PER_PAGE },
          data: {
            ...data,
            paginatedMerchantList: {
              ...data.paginatedMerchantList,
              list: [...data.paginatedMerchantList.list, createdMerchant],
            },
          },
        })
        return
      }

      client
        .query<PaginatedMerchantListQuery>({
          query: PaginatedMerchantListDocument,
          variables: { skip: 0, take: PER_PAGE },
        })
        .then(({ data }) => {
          if (!data.paginatedMerchantList.totalCount) return
          client.writeQuery<PaginatedMerchantListQuery>({
            query: PaginatedMerchantListDocument,
            data: {
              ...data,
              paginatedMerchantList: {
                ...data.paginatedMerchantList,
                totalCount: data.paginatedMerchantList.totalCount + 1,
                list: [...data.paginatedMerchantList.list, createdMerchant],
              },
            },
          })
        })
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  const { handleSubmit, errors, values, handleChange, isValid, validateField } = useFormik<Form>({
    validateOnBlur: true,
    validateOnChange: false,
    initialValues: {
      companyName: '',
      address: '',
      postCode: '',
      city: '',
      country: '',
      VATId: '',
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
      const errors: Partial<Record<keyof Form, string>> = {}

      if (values.companyName.length > 100) errors.companyName = 'Company name should be shorter'
      if (values.address.length > 100) errors.address = 'Address should be shorter'
      if (values.postCode.length > 10) errors.postCode = 'Post code should be shorter'
      if (values.city.length > 100) errors.city = 'City should be shorter'
      if (values.country.length > 100) errors.country = 'Country should be shorter'
      if (values.bankName.length > 100) errors.bankName = 'Bank name should be shorter'
      if (values.issuerName.length > 100) errors.issuerName = 'Issuer name should be shorter'

      if (
        values.bankAccountPln &&
        (values.bankAccountPln.replace(/ /g, '').length < 26 ||
          values.bankAccountPln.replace(/ /g, '').length > 30)
      ) {
        console.log(values.bankAccountPln.length)
        errors.bankAccountPln = 'Bank account should be between 26 and 30 digits'
      }

      if (
        values.bankAccountEur &&
        (values.bankAccountEur.length < 26 || values.bankAccountEur.length > 30)
      )
        errors.bankAccountEur = 'Bank account should be between 26 and 30 digits'
      if (values.email.length > 100) errors.email = 'Email should be shorter'
      if (isNaN(Number(values.VATId.replace(/ /g, '')))) errors.VATId = 'VATid is invalid'

      console.log({ errors })
      return errors
    },
  })

  console.log({ values })

  return (
    <Flex>
      <BlurredImg width={500} optimizedImg={womanWithFoldersImg} />

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
            <FormControl isRequired mt="5" id="VATId" isInvalid={!!errors.VATId}>
              <FormLabel htmlFor="VATId">VAT Id</FormLabel>
              <Input
                name="VATId"
                placeholder="12345678"
                value={values.VATId}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.VATId}</FormErrorMessage>
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
              <Input name="city" placeholder="Poznań" value={values.city} onChange={handleChange} />
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

          <FormControl mt="4" id="bankAccount" isInvalid={!!errors.bankAccountPln}>
            <FormLabel htmlFor="bankAccount">Bank account in PLN</FormLabel>
            <Input
              name="bankAccountPln"
              placeholder="04 1140 2004 9892 3802 6728 1373"
              value={values.bankAccountPln}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.bankAccountPln}</FormErrorMessage>
          </FormControl>

          <FormControl mt="4" id="bankAccountEur" isInvalid={!!errors.bankAccountEur}>
            <FormLabel htmlFor="bankAccountEur">Bank account in EUR</FormLabel>
            <Input
              name="bankAccountEur"
              placeholder="PL 04 1140 2004 9892 3802 6728 1373"
              value={values.bankAccountEur}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.bankAccountEur}</FormErrorMessage>
          </FormControl>

          <FormControl mt="4" id="Email" isInvalid={!!errors.email}>
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
  )
}

export default CreateMerchantForm
