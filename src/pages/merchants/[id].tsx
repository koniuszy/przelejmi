import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Center, Spinner, useToast } from '@chakra-ui/react'

import MerchantForm from 'merchants/MerchantForm'

import { useMerchantQuery, useUpdateMerchantMutation } from 'src/generated/hasura'

import prisma from 'src/lib/prisma'
import { errorToastContent, successToastContent } from 'src/lib/toastContent'

const EditMerchantForm: FC<{
  merchantId: number
}> = ({ merchantId }) => {
  const toast = useToast()

  const { data, updateQuery } = useMerchantQuery({ variables: { id: { _eq: merchantId } } })

  const [updateMerchant, { loading }] = useUpdateMerchantMutation({
    onCompleted({ update_Merchant }) {
      if (!update_Merchant) throw new Error()
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((p) => ({ ...p, Merchant: update_Merchant.returning }))
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  if (!data)
    return (
      <div>
        <MerchantForm
          isSubmitting={false}
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

  const { __typename, id, ...initialValues } = data.Merchant[0]
  return (
    <MerchantForm
      isSubmitting={loading}
      initialValues={{ ...initialValues, bankAccountEur: initialValues.bankAccountEur ?? '' }}
      onSubmit={(set) => updateMerchant({ variables: { where: { id: { _eq: id } }, _set: set } })}
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
