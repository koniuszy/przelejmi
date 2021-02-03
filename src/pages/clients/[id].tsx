import React, { FC, useState } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

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

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'
import { PrismaClient } from '@prisma/client'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  PaginatedClientListDocument,
  ClientContentFragment,
  useUpdateClientMutation,
  usePaginatedClientListQuery,
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

  const [updateClient, { client }] = useUpdateClientMutation({
    onCompleted(response) {
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      const data = client.readQuery({ query: PaginatedClientListDocument })
      if (!data) {
        client
          .query({
            query: PaginatedClientListDocument,
            variables: { skip: 0, take: PER_PAGE },
          })
          .then((res) => {
            if (!res.data.clientList.length) return
            client.writeQuery({
              query: PaginatedClientListDocument,
              data: { ...res, clientList: [response.updatedClient] },
            })
          })
        return
      }

      client.writeQuery({
        query: PaginatedClientListDocument,
        data: { ...data, clientList: [...data.clientList, response.updatedClient] },
      })
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

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
