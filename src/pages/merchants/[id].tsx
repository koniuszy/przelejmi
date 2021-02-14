import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Center, Spinner } from '@chakra-ui/react'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'

import prisma from 'src/lib/prismaClient'

import { OptimizedImg } from 'src/types'

import MerchantDetails from 'src/components/Pages/merchants/MerchantDetails'

type SSGProps = {
  calmInTrolleyImg: OptimizedImg
  merchantId: number
}

const MerchantDetailsPage: FC<SSGProps> = (props) => {
  const route = useRouter()

  console.log(props.merchantId, route.isFallback)
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
          <MerchantDetails {...props} />
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
  const src = '/womanWithFolders.jpg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)

  const base64 = await getBase64(img)

  return {
    props: {
      merchantId: Number(params.id),
      calmInTrolleyImg: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}

export default MerchantDetailsPage
