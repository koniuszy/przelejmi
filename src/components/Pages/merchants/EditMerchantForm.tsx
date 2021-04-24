import React, { FC } from 'react'

import { Flex, Spinner, Text, useToast } from '@chakra-ui/react'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  useUpdateMerchantMutation,
  useMerchantQuery,
  MerchantContentFragment,
  PaginatedMerchantListDocument,
  PaginatedMerchantListQuery,
} from 'src/generated/graphql'
import { OptimizedImg } from 'src/types'

import BlurredImg from 'src/components/BlurredImg'
import Editable from 'src/components/Editable'

import { PER_PAGE } from './MerchantList'

const MerchantDetailsForm: FC<{
  merchant: MerchantContentFragment
  onUpdate(merchant: Partial<MerchantContentFragment>): void
}> = ({ merchant, onUpdate }) => (
  <Flex direction="column">
    <Text pt="5" pb="2" fontWeight="500">
      Company name
    </Text>
    <Editable
      border
      defaultValue={merchant.companyName}
      onSubmit={(companyName) => onUpdate({ companyName })}
    />

    {merchant.VATId && (
      <>
        <Text pt="5" pb="2" fontWeight="500">
          Vat id
        </Text>
        <Editable border defaultValue={merchant.VATId} onSubmit={(VATId) => onUpdate({ VATId })} />
      </>
    )}

    <Text pt="10" pb="2" fontWeight="500">
      Street name and number
    </Text>
    <Editable
      border
      defaultValue={merchant.address}
      onSubmit={(address) => onUpdate({ address })}
    />

    <Text pt="4" pb="2" fontWeight="500">
      Post code
    </Text>
    <Editable
      border
      defaultValue={merchant.postCode}
      onSubmit={(postCode) => onUpdate({ postCode })}
    />

    <Text pt="4" pb="2" fontWeight="500">
      City
    </Text>
    <Editable border defaultValue={merchant.city} onSubmit={(city) => onUpdate({ city })} />

    <Text pt="4" pb="2" fontWeight="500">
      Country
    </Text>
    <Editable
      border
      defaultValue={merchant.country}
      onSubmit={(country) => onUpdate({ country })}
    />
  </Flex>
)

const EditMerchantForm: FC<{
  calmInTrolleyImg: OptimizedImg
  merchantId: number
}> = ({ merchantId, calmInTrolleyImg }) => {
  const { data, updateQuery } = useMerchantQuery({ variables: { where: { id: merchantId } } })

  const toast = useToast()

  const [updateMerchant, updateMerchantOptions] = useUpdateMerchantMutation({
    onCompleted({ updatedMerchant }) {
      toast({
        ...successToastContent,
        title: 'Client updated.',
      })

      updateQuery((p) => ({ ...p, updatedMerchant }))

      const data = updateMerchantOptions.client.readQuery<PaginatedMerchantListQuery>({
        query: PaginatedMerchantListDocument,
      })

      if (data) {
        updateMerchantOptions.client.writeQuery<PaginatedMerchantListQuery>({
          query: PaginatedMerchantListDocument,
          data: {
            ...data,
            paginatedMerchantList: {
              ...data.paginatedMerchantList,
              list: [...data.paginatedMerchantList.list, updatedMerchant],
            },
          },
        })
        return
      }

      updateMerchantOptions.client
        .query({
          query: PaginatedMerchantListDocument,
          variables: { skip: 0, take: PER_PAGE },
        })
        .then((res) => {
          if (!res.data.merchantList?.length) return
          updateMerchantOptions.client.writeQuery<PaginatedMerchantListQuery>({
            query: PaginatedMerchantListDocument,
            data: {
              ...data,
              paginatedMerchantList: {
                ...data.paginatedMerchantList,
                list: [...data.paginatedMerchantList.list, updatedMerchant],
              },
            },
          })
        })
    },
    onError(err) {
      console.error(err)
      toast(errorToastContent)
    },
  })

  function handleUpdate(dataToUpdate: Partial<MerchantContentFragment>) {
    updateMerchant({ variables: { data: dataToUpdate, id: data.merchant.id } })
  }

  return (
    <Flex>
      <BlurredImg optimizedImg={calmInTrolleyImg} height={760} />
      {data ? (
        <MerchantDetailsForm merchant={data.merchant} onUpdate={handleUpdate} />
      ) : (
        <Spinner />
      )}
    </Flex>
  )
}

export default EditMerchantForm
