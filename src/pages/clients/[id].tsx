import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Spinner, Center } from '@chakra-ui/react'

import EditClientForm from 'src/clients/EditClientForm'
import prisma from 'src/lib/prisma/prismaClient'

type SSGProps = {
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
  return {
    props: {
      clientId: Number(params.id),
    },
  }
}

export default EditClientFormPage
