import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Center, Spinner } from '@chakra-ui/react'

import prisma from 'src/lib/prisma/prismaClient'
import EditMerchantForm from 'src/merchants/EditMerchantForm'

type SSGProps = {
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
  return {
    props: {
      merchantId: Number(params.id),
    },
  }
}

export default EditMerchantFormPage
