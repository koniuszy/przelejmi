import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Center, Spinner, useToast } from '@chakra-ui/react'

import MerchantForm from 'merchants/MerchantForm'

import { useUpdateMerchantMutation, useMerchantQuery } from 'src/generated/graphql'

import prisma from 'src/lib/prisma'
import { errorToastContent, successToastContent } from 'src/lib/toastContent'

const EditMerchantForm: FC<{
  merchantId: number
}> = ({ merchantId }) => {
  const toast = useToast()

  const { data, updateQuery } = useMerchantQuery({ variables: { where: { id: merchantId } } })

  const [updateMerchant, { loading }] = useUpdateMerchantMutation({
    onCompleted({ updatedMerchant }) {
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((p) => ({ ...p, merchant: updatedMerchant }))
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  if (!data?.merchant)
    return (
      <div>
        <MerchantForm
          isLoading={true}
          initialValues={{
            companyName: '',
            address: '',
            postCode: '',
            city: '',
            country: '',
            vatId: '',
            bankAccountPln: '',
            bankAccountEur: '',
            bankName: '',
            email: '',
            issuerName: '',
          }}
          onSubmit={() => {}}
        />
      </div>
    )

  return (
    <MerchantForm
      isLoading={loading}
      initialValues={{ ...data.merchant, bankAccountEur: data.merchant.bankAccountEur ?? '' }}
      onSubmit={(values) => updateMerchant({ variables: { data: values, id: merchantId } })}
    />
  )
}

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
      merchantId: Number(params?.id),
    },
  }
}

export default EditMerchantFormPage
