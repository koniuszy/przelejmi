import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Spinner, Center } from '@chakra-ui/react'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'

import prisma from 'src/lib/prisma/prismaClient'

import { OptimizedImg } from 'src/types'

import EditClientForm from 'src/components/Pages/clients/EditClientForm'

type SSGProps = {
  calmInTrolleyImg: OptimizedImg
  clientId: number
}

const EditClientFormPage: FC<SSGProps> = (props) => {
  const route = useRouter()

  return (
    <>
      <Head>
        <title>Edit client | przelejmi</title>
      </Head>
      {route.isFallback ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <EditClientForm {...props} />
      )}
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
  const src = '/hecticInTrolley.jpeg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)

  const base64 = await getBase64(img)

  return {
    props: {
      clientId: Number(params.id),
      calmInTrolleyImg: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}

export default EditClientFormPage
