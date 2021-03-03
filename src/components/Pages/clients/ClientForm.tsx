import React, { FC, useState } from 'react'

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
  useToast,
} from '@chakra-ui/react'

import { useFormik } from 'formik'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  useCreateClientMutation,
  PaginatedClientListDocument,
  PaginatedClientListQuery,
} from 'src/generated/graphql'
import { ClientType, OptimizedImg } from 'src/types'

import BlurredImg from 'src/components/BlurredImg'

import { PER_PAGE } from './ClientTable'

type Form = {
  name: string
  address: string
  postCode: string
  city: string
  country: string
  VATId: string
}

const ClientForm: FC<{
  calmInTrolleyImg: OptimizedImg
}> = ({ calmInTrolleyImg }) => {
  const toast = useToast()
  const [clientType, setClientType] = useState<ClientType>(ClientType.company)
  const [createClient, { loading, client }] = useCreateClientMutation({
    onCompleted({ createdClient }) {
      toast({
        ...successToastContent,
        title: 'Client created.',
      })

      const data = client.readQuery<PaginatedClientListQuery>({
        query: PaginatedClientListDocument,
      })

      if (data) {
        client.writeQuery<PaginatedClientListQuery>({
          query: PaginatedClientListDocument,
          data: {
            ...data,
            paginatedClientList: {
              ...data.paginatedClientList,
              list: [...data.paginatedClientList.list, createdClient],
            },
          },
        })
        return
      }

      client
        .query<PaginatedClientListQuery>({
          query: PaginatedClientListDocument,
          variables: { skip: 0, take: PER_PAGE },
        })
        .then(({ data }) => {
          if (!data.paginatedClientList.totalCount) return
          client.writeQuery<PaginatedClientListQuery>({
            query: PaginatedClientListDocument,
            data: {
              ...data,
              paginatedClientList: {
                ...data.paginatedClientList,
                totalCount: data.paginatedClientList.totalCount + 1,
                list: [...data.paginatedClientList.list, createdClient],
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

  const { handleSubmit, errors, values, handleChange, isValid } = useFormik<Form>({
    initialValues: { name: '', address: '', postCode: '', city: '', country: '', VATId: '' },
    onSubmit(values) {
      const { VATId, ...data } = values
      createClient({
        variables: {
          data: { ...data, VATId: clientType === ClientType.company ? VATId : null },
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
      if (isNaN(Number(values.VATId.replace(/ /g, '')))) errors.VATId = 'NIP is invalid'

      return errors
    },
  })

  return (
    <Flex>
      <BlurredImg width={500} optimizedImg={calmInTrolleyImg} />

      <form onSubmit={handleSubmit}>
        <Flex direction="column">
          <RadioGroup value={clientType} onChange={(value) => setClientType(value as ClientType)}>
            <Text fontWeight="500">Client type</Text>
            <Stack pt="3" spacing={5} direction="row">
              {Object.values(ClientType).map((value) => (
                <Radio key={value} cursor="pointer" colorScheme="green" value={value}>
                  {value}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          <FormControl isRequired mt="5" id="name" isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              name="name"
              placeholder="John Smith"
              value={values.name}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          {clientType === ClientType.company && (
            <FormControl isRequired mt="10" id="VATId" isInvalid={!!errors.VATId}>
              <FormLabel htmlFor="VATId">NIP</FormLabel>
              <Input
                name="VATId"
                placeholder="12345678"
                value={values.VATId}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.VATId}</FormErrorMessage>
            </FormControl>
          )}

          <FormControl isRequired mt="10" id="address" isInvalid={!!errors.address}>
            <FormLabel htmlFor="address">Street name and number</FormLabel>
            <Input
              name="address"
              placeholder="Street 10/2"
              value={values.address}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired mt="2" id="postCode" isInvalid={!!errors.postCode}>
            <FormLabel htmlFor="postCode">Post code</FormLabel>
            <Input
              name="postCode"
              placeholder="60-687"
              value={values.postCode}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.postCode}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired mt="2" id="city" isInvalid={!!errors.city}>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input name="city" placeholder="Poznań" value={values.city} onChange={handleChange} />
            <FormErrorMessage>{errors.country}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired mt="2" id="country" isInvalid={!!errors.country}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              name="country"
              placeholder="Polska"
              value={values.country}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.country}</FormErrorMessage>
          </FormControl>

          <Button mt="10" type="submit" colorScheme="teal" disabled={!isValid} isLoading={loading}>
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default ClientForm
