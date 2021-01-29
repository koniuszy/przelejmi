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
import { Client } from '@prisma/client'
import { useFormik } from 'formik'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import { CREATE_CLIENT_MUTATION } from 'src/graphql/mutations'
import { CLIENTS_QUERY } from 'src/graphql/queries'
import { ClientType, OptimizedImg } from 'src/types'

type SSGProps = {
  calmInTrolleyImg: OptimizedImg
}

type Form = {
  name: string
  address: string
  postCode: string
  city: string
  country: string
  nip: string
}

const imgWidth = 500

const CreateClient: FC<SSGProps> = ({ calmInTrolleyImg }) => {
  const toast = useToast()
  const [clientType, setClientType] = useState<ClientType>(ClientType.COMPANY)
  const [createClient, { loading, client }] = useMutation<{ createdClient: Client }>(
    CREATE_CLIENT_MUTATION,
    {
      onCompleted(response) {
        const data = client.readQuery({ query: CLIENTS_QUERY })
        if (!data) return

        client.writeQuery({
          query: CLIENTS_QUERY,
          data: { ...data, clientList: [...data.clientList, response.createdClient] },
        })
        toast({
          ...successToastContent,
          title: 'Client created.',
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
    initialValues: { name: '', address: '', postCode: '', city: '', country: '', nip: '' },
    onSubmit(values) {
      const { nip, ...data } = values
      createClient({
        variables: {
          data: { ...data, nip: clientType === ClientType.COMPANY ? Number(nip) : null },
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
      if (isNaN(Number(values.nip.replace(/ /g, '')))) errors.nip = 'NIP is invalid'

      return errors
    },
  })

  return (
    <>
      <Head>
        <title>przelejmi | Create client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex>
        <Box className="nextImgBox">
          <img
            aria-hidden="true"
            alt="placeholder"
            className="nextImgPlaceholder"
            src={calmInTrolleyImg.base64}
          />
          <NextImg
            width={imgWidth}
            src={calmInTrolleyImg.src}
            objectFit="contain"
            objectPosition="center"
            height={calmInTrolleyImg.ratio * imgWidth}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Flex direction="column">
            <RadioGroup value={clientType} onChange={(value) => setClientType(value as ClientType)}>
              <Text>Client type</Text>
              <Stack pt="3" spacing={5} direction="row">
                {Object.values(ClientType).map((value) => (
                  <Radio key={value} cursor="pointer" colorScheme="green" value={value}>
                    {value}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <FormControl isRequired mt="10" id="name" isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                name="name"
                placeholder="John Smith"
                onChange={handleChange}
                value={values.name}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            {clientType === ClientType.COMPANY && (
              <FormControl isRequired mt="10" id="nip" isInvalid={!!errors.nip}>
                <FormLabel htmlFor="nip">NIP</FormLabel>
                <Input
                  name="nip"
                  placeholder="12345678"
                  onChange={handleChange}
                  value={values.nip}
                />
                <FormErrorMessage>{errors.nip}</FormErrorMessage>
              </FormControl>
            )}

            <FormControl isRequired mt="10" id="address" isInvalid={!!errors.address}>
              <FormLabel htmlFor="address">Street name and number</FormLabel>
              <Input
                name="address"
                placeholder="Street 10/2"
                onChange={handleChange}
                value={values.address}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

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

            <FormControl isRequired mt="2" id="city" isInvalid={!!errors.city}>
              <FormLabel htmlFor="city">City</FormLabel>
              <Input name="city" placeholder="Poznań" onChange={handleChange} value={values.city} />
              <FormErrorMessage>{errors.country}</FormErrorMessage>
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

            <Button
              mt="10"
              type="submit"
              colorScheme="teal"
              disabled={!isValid}
              isLoading={loading}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
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
