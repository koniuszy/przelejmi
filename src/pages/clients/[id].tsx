import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'
import NextImg from 'next/image'

import { Box, Flex, RadioGroup, Stack, Radio, Text, useToast } from '@chakra-ui/react'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'
import { PrismaClient } from '@prisma/client'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  PaginatedClientListDocument,
  ClientContentFragment,
  useUpdateClientMutation,
  useClientQuery,
} from 'src/generated/graphql'
import { ClientType, OptimizedImg } from 'src/types'

import { PER_PAGE } from './index'

type SSGProps = {
  calmInTrolleyImg: OptimizedImg
  initialClient: ClientContentFragment
}

const imgWidth = 500

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
        <title>przelejmi | Edit client</title>
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

        <Flex direction="column">
          <RadioGroup
            value={client.nip ? ClientType.company : ClientType.person}
            onChange={() => handleUpdate({ nip: client.nip ? null : '0' })}
          >
            <Text>Client type</Text>
            <Stack pt="3" spacing={5} direction="row">
              {Object.values(ClientType).map((value) => (
                <Radio key={value} cursor="pointer" colorScheme="green" value={value}>
                  {value}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Flex>
      </Flex>
    </>
  )
}

type Params = { id: string }

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const prisma = new PrismaClient()
  const idList = await prisma.client.findMany({ select: { id: true } })

  const paths = idList.map(({ id }) => ({
    params: { id: id.toString() },
  }))

  prisma.$disconnect()

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<SSGProps, Params> = async ({ params }) => {
  const prisma = new PrismaClient()

  const src = '/calmInTrolley.jpg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)

  const [base64, initialClient] = await Promise.all([
    getBase64(img),
    prisma.client.findFirst({ where: { id: { equals: parseInt(params.id) } } }),
  ])

  prisma.$disconnect()

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
