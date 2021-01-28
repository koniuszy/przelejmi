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

import { useMutation } from '@apollo/client'
import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'
import { Client, PrismaClient } from '@prisma/client'
import { useFormik } from 'formik'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import { CREATE_CLIENT_MUTATION } from 'src/graphql/mutations'
import { CLIENTS_QUERY } from 'src/graphql/queries'
import { ClientType, OptimizedImg } from 'src/types'

type SSGProps = {
  calmInTrolleyImg: OptimizedImg
  client: Client
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

const CreateClient: FC<SSGProps> = ({ calmInTrolleyImg, client }) => {
  return (
    <>
      <Head>
        <title>przelejmi | Update client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>soon</h1>
    </>
  )
}

type StaticPathsParams = { id: string }

export const getStaticProps: GetStaticProps<SSGProps, StaticPathsParams> = async (context) => {
  const src = '/calmInTrolley.jpg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)
  const base64 = await getBase64(img)

  const prisma = new PrismaClient()
  const client = await prisma.client.findFirst({ where: { id: Number(context.params.id) } })

  return {
    props: {
      client,
      calmInTrolleyImg: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticPathsParams> = async () => {
  const prisma = new PrismaClient()
  const clients = await prisma.client.findMany()
  prisma.$disconnect()

  return { paths: clients.map(({ id }) => ({ params: { id: id.toString() } })), fallback: false }
}

export default CreateClient
