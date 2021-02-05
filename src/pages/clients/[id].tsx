import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'

import { Flex, RadioGroup, Stack, Radio, Text, useToast } from '@chakra-ui/react'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'

import prisma from 'src/lib/prismaClient'
import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  PaginatedClientListDocument,
  ClientContentFragment,
  useUpdateClientMutation,
  useClientQuery,
} from 'src/generated/graphql'
import { ClientType, OptimizedImg } from 'src/types'

import BlurredImg from 'src/components/BlurredImg'
import Editable from 'src/components/Editable'

import { PER_PAGE } from './index'

type SSGProps = {
  calmInTrolleyImg: OptimizedImg
  initialClient: ClientContentFragment
}

const EditClient: FC<SSGProps> = ({ calmInTrolleyImg, initialClient }) => {
  const toast = useToast()
  const id = initialClient.id
  const { data, updateQuery } = useClientQuery({ variables: { where: { id } } })

  const [updateClient, updateClientOptions] = useUpdateClientMutation({
    onCompleted(response) {
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((prev) => ({ ...prev, client: response.updatedClient }))

      const data = updateClientOptions.client.readQuery({ query: PaginatedClientListDocument })
      if (!data) {
        updateClientOptions.client
          .query({
            query: PaginatedClientListDocument,
            variables: { skip: 0, take: PER_PAGE },
          })
          .then((res) => {
            if (!res.data.clientList?.length) return
            updateClientOptions.client.writeQuery({
              query: PaginatedClientListDocument,
              data: { ...res, clientList: [response.updatedClient] },
            })
          })
        return
      }

      updateClientOptions.client.writeQuery({
        query: PaginatedClientListDocument,
        data: { ...data, clientList: [...data.clientList, response.updatedClient] },
      })
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  function handleUpdate(data: Partial<ClientContentFragment>) {
    updateClient({ variables: { data, id } })
  }
  const client = data?.client ?? initialClient

  return (
    <>
      <Head>
        <title>Edit client | przelejmi</title>
      </Head>

      <Flex>
        <BlurredImg optimizedImg={calmInTrolleyImg} width={500} />

        <Flex direction="column">
          <RadioGroup
            value={client.VATId ? ClientType.company : ClientType.person}
            onChange={() => handleUpdate({ VATId: client.VATId ? null : '0' })}
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

          <Text pt="5" pb="2" fontWeight="500">
            Name
          </Text>
          <Editable border defaultValue={client.name} onSubmit={(name) => handleUpdate({ name })} />

          {client.VATId && (
            <>
              <Text pt="5" pb="2" fontWeight="500">
                Vat id
              </Text>
              <Editable
                border
                defaultValue={client.VATId}
                onSubmit={(VATId) => handleUpdate({ VATId })}
              />
            </>
          )}

          <Text pt="10" pb="2" fontWeight="500">
            Street name and number
          </Text>
          <Editable
            border
            defaultValue={client.address}
            onSubmit={(address) => handleUpdate({ address })}
          />

          <Text pt="4" pb="2" fontWeight="500">
            Post code
          </Text>
          <Editable
            border
            defaultValue={client.postCode}
            onSubmit={(postCode) => handleUpdate({ postCode })}
          />

          <Text pt="4" pb="2" fontWeight="500">
            City
          </Text>
          <Editable border defaultValue={client.city} onSubmit={(city) => handleUpdate({ city })} />

          <Text pt="4" pb="2" fontWeight="500">
            Country
          </Text>
          <Editable
            border
            defaultValue={client.country}
            onSubmit={(country) => handleUpdate({ country })}
          />
        </Flex>
      </Flex>
    </>
  )
}

type Params = { id: string }

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const idList = await prisma.client.findMany({ select: { id: true } })

  const paths = idList.map(({ id }) => ({
    params: { id: id.toString() },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<SSGProps, Params> = async ({ params }) => {
  const src = '/calmInTrolley.jpg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)

  const [base64, initialClient] = await Promise.all([
    getBase64(img),
    prisma.client.findFirst({ where: { id: { equals: parseInt(params.id) } } }),
  ])

  return {
    props: {
      initialClient,
      calmInTrolleyImg: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}

export default EditClient
