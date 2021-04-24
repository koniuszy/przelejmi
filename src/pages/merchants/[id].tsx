import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Center, Spinner } from '@chakra-ui/react'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'

import prisma from 'src/lib/prismaClient'

import { OptimizedImg } from 'src/types'

import EditMerchantForm from 'src/components/Pages/merchants/EditMerchantForm'

type SSGProps = {
  sittingLadyWithFolders: OptimizedImg
  merchantId: number
}

const EditMerchantFormPage: FC<SSGProps> = (props) => {
  const route = useRouter()

  return (
    <>
      <Head>
        <title>Edit merchant | przelejmi</title>
      </Head>
      <main>
        {route.isFallback ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <EditMerchantForm {...props} />
        )}
      </main>
    </>
  )
}

type Params = { id: string }

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const idList = await prisma.merchant.findMany({ select: { id: true } })

  const paths = idList.map(({ id }) => ({
    params: { id: id.toString() },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<SSGProps, Params> = async ({ params }) => {
  const src = '/sittingLadyWithFolders.jpeg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)

  const base64 = await getBase64(img)

  return {
    props: {
      merchantId: Number(params.id),
      sittingLadyWithFolders: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}

export default EditMerchantFormPage
