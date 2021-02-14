import React, { FC } from 'react'

import { Flex, Spinner, Text, useToast } from '@chakra-ui/react'

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

import { PER_PAGE } from './MerchantTable'

const MerchantDetails: FC<{
  calmInTrolleyImg: OptimizedImg
  merchantId: number
}> = ({ calmInTrolleyImg, merchantId }) => {
  const toast = useToast()
  const { data, updateQuery } = useMerchantQuery({ variables: { where: { id: merchantId } } })

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
    updateMerchant({ variables: { data, id: merchantId } })
  }

  if (!data) return <Spinner />

  const { merchant } = data

  return (
    <>
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

          {merchant.VATId && (
            <>
              <Text pt="5" pb="2" fontWeight="500">
                Vat id
              </Text>
              <Editable
                border
                defaultValue={merchant.VATId}
                onSubmit={(VATId) => handleUpdate({ VATId })}
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

export default MerchantDetails
