import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Spinner, Center, useToast } from '@chakra-ui/react'

import ClientForm from 'clients/ClientForm'

import { useUpdateClientMutation, useClientQuery } from 'src/generated/graphql'

import prisma from 'src/lib/prisma'
import { errorToastContent, successToastContent } from 'src/lib/toastContent'
import { ClientType } from 'src/types'

const EditClientForm: FC<{
  clientId: number
}> = ({ clientId }) => {
  const toast = useToast()

  const { data, updateQuery } = useClientQuery({ variables: { where: { id: clientId } } })

  const [updateClient, { loading }] = useUpdateClientMutation({
    onCompleted({ updatedClient }) {
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((prev) => ({ ...prev, client: updatedClient }))
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  if (!data?.client)
    return (
      <ClientForm
        isLoading={true}
        initialValues={{ name: '', address: '', postCode: '', city: '', country: '', vatId: '' }}
        onSubmit={() => {}}
      />
    )

  return (
    <ClientForm
      isLoading={loading}
      initialValues={{ ...data.client, vatId: data.client.vatId ?? '' } || {}}
      onSubmit={(values) => {
        const { vatId, clientType, ...data } = values
        updateClient({
          variables: {
            data: { ...data, vatId: clientType === ClientType.company ? vatId : null },
            id: clientId,
          },
        })
      }}
    />
  )
}

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
      clientId: Number(params?.id),
    },
  }
}

export default EditClientFormPage
