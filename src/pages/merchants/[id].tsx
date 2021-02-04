import React, { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import Head from 'next/head'

import { Flex, Text, useToast } from '@chakra-ui/react'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'
import { PrismaClient } from '@prisma/client'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  useUpdateMerchantMutation,
  useMerchantQuery,
  MerchantContentFragment,
  PaginatedMerchantListDocument,
} from 'src/generated/graphql'
import { OptimizedImg } from 'src/types'

import BlurredImg from 'src/components/BlurredImg'
import Editable from 'src/components/Editable'

import { PER_PAGE } from './index'

type SSGProps = {
  calmInTrolleyImg: OptimizedImg
  initialMerchant: MerchantContentFragment
}

const EditMerchant: FC<SSGProps> = ({ calmInTrolleyImg, initialMerchant }) => {
  const toast = useToast()
  const id = initialMerchant.id
  const { data, updateQuery } = useMerchantQuery({ variables: { where: { id } } })

  const [updateMerchant, updateMerchantOptions] = useUpdateMerchantMutation({
    onCompleted(response) {
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((prev) => ({ ...prev, merchant: response.updatedMerchant }))

      const data = updateMerchantOptions.client.readQuery({ query: PaginatedMerchantListDocument })
      if (!data) {
        updateMerchantOptions.client
          .query({
            query: PaginatedMerchantListDocument,
            variables: { skip: 0, take: PER_PAGE },
          })
          .then((res) => {
            if (!res.data.merchantList?.length) return
            updateMerchantOptions.client.writeQuery({
              query: PaginatedMerchantListDocument,
              data: { ...res, merchantList: [response.updatedMerchant] },
            })
          })
        return
      }

      updateMerchantOptions.client.writeQuery({
        query: PaginatedMerchantListDocument,
        data: { ...data, merchantList: [...data.merchantList, response.updatedMerchant] },
      })
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  function handleUpdate(data: Partial<MerchantContentFragment>) {
    updateMerchant({ variables: { data, id } })
  }
  const merchant = data?.merchant ?? initialMerchant

  return (
    <>
      <Head>
        <title>Edit merchant | przelejmi</title>
      </Head>

      <Flex>
        <BlurredImg optimizedImg={calmInTrolleyImg} width={500} />

        <Flex direction="column">
          <Text pt="5" pb="2" fontWeight="500">
            Company name
          </Text>
          <Editable
            border
            defaultValue={merchant.companyName}
            onSubmit={(companyName) => handleUpdate({ companyName })}
          />

          {merchant.nip && (
            <>
              <Text pt="5" pb="2" fontWeight="500">
                Vat id
              </Text>
              <Editable
                border
                defaultValue={merchant.nip}
                onSubmit={(nip) => handleUpdate({ nip })}
              />
            </>
          )}

          <Text pt="10" pb="2" fontWeight="500">
            Street name and number
          </Text>
          <Editable
            border
            defaultValue={merchant.address}
            onSubmit={(address) => handleUpdate({ address })}
          />

          <Text pt="4" pb="2" fontWeight="500">
            Post code
          </Text>
          <Editable
            border
            defaultValue={merchant.postCode}
            onSubmit={(postCode) => handleUpdate({ postCode })}
          />

          <Text pt="4" pb="2" fontWeight="500">
            City
          </Text>
          <Editable
            border
            defaultValue={merchant.city}
            onSubmit={(city) => handleUpdate({ city })}
          />

          <Text pt="4" pb="2" fontWeight="500">
            Country
          </Text>
          <Editable
            border
            defaultValue={merchant.country}
            onSubmit={(country) => handleUpdate({ country })}
          />
        </Flex>
      </Flex>
    </>
  )
}

type Params = { id: string }

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const prisma = new PrismaClient()
  const idList = await prisma.merchant.findMany({ select: { id: true } })

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

  const src = '/womanWithFolders.jpg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)

  const [base64, initialMerchant] = await Promise.all([
    getBase64(img),
    prisma.merchant.findFirst({ where: { id: { equals: parseInt(params.id) } } }),
  ])

  prisma.$disconnect()

  return {
    props: {
      initialMerchant,
      calmInTrolleyImg: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}

export default EditMerchant
