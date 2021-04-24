import React, { FC, useState } from 'react'

import { Tr, Td, useToast } from '@chakra-ui/react'

import { Merchant } from 'prisma/prisma-client'

import { errorToastContent, successToastContent, warningToastContent } from 'src/lib/toastContent'

import {
  useUpdateMerchantMutation,
  PaginatedMerchantListDocument,
  usePaginatedMerchantListQuery,
} from 'src/generated/graphql'

import Editable from 'src/components/Editable'
import Table, { TablePlaceholder } from 'src/components/Table'

import ActionsColumn from './ActionsColumn'

export const PER_PAGE = 10
const TITLE = 'Total merchants'

const MerchantList: FC = () => {
  const toast = useToast()

  const [isEditable, setIsEditable] = useState(true)

  const { data, refetch, variables, previousData, loading } = usePaginatedMerchantListQuery({
    variables: { skip: 0, take: PER_PAGE },
  })

  const [updateMerchant, updateMerchantOptions] = useUpdateMerchantMutation({
    onCompleted(response) {
      toast({ ...successToastContent, title: 'Merchant updated' })
      updateMerchantOptions.client.writeQuery({
        query: PaginatedMerchantListDocument,
        variables,
        data: {
          ...data,
          paginatedMerchantList: {
            ...data.paginatedMerchantList,
            list: data.paginatedMerchantList.list.map((item) =>
              item.id === response.updatedMerchant.id ? response.updatedMerchant : item
            ),
          },
        },
      })
    },
    onError() {
      toast(errorToastContent)
      toast(warningToastContent)
    },
  })

  function handleUpdate(data: Partial<Merchant>, id: number) {
    const [value] = Object.values(data)

    if (value === '' && data.VATId !== value) {
      toast(errorToastContent)
      toast(warningToastContent)
      return
    }

    updateMerchant({ variables: { data, id } })
  }

  const results = data || previousData

  if (!results) return <TablePlaceholder title={TITLE} />

  const {
    list: merchantList,
    totalCount,
    filters: { __typename, ...filters },
  } = results.paginatedMerchantList

  return (
    <Table
      emptyListHeading="No merchants yet 🤫"
      createHref="merchants/create"
      perPage={PER_PAGE}
      totalRecordsCount={totalCount}
      list={merchantList}
      variables={variables}
      refetch={refetch}
      filtersHeaderProps={{
        isLoading: loading,
        title: TITLE,
        isEditable,
        filterOptions: { ...filters },
        onEditableToggle: setIsEditable,
        async onDrawerChange({ bank, ...filters }) {
          const where = { ...filters }
          if (bank) where.bankName = bank
          await refetch({ where })
        },
      }}
      headerList={[
        `total: ${totalCount}`,
        { title: 'company', sortableKey: 'companyName' },
        { title: 'issuer', sortableKey: 'issuerName' },
        'email',
        'bank',
        'actions',
      ]}
      rowRender={(item: Merchant, index) => (
        <Tr key={item.id}>
          <Td>{index + 1}.</Td>
          <Td>
            <Editable
              defaultValue={item.companyName}
              isDisabled={!isEditable}
              onSubmit={(companyName) => handleUpdate({ companyName }, item.id)}
            />
          </Td>
          <Td>
            <Editable
              defaultValue={item.issuerName}
              isDisabled={!isEditable}
              onSubmit={(issuerName) => handleUpdate({ issuerName }, item.id)}
            />
          </Td>
          <Td>
            <Editable
              defaultValue={item.email}
              isDisabled={!isEditable}
              onSubmit={(email) => handleUpdate({ email }, item.id)}
            />
          </Td>
          <Td>
            <Editable
              defaultValue={item.bankName}
              isDisabled={!isEditable}
              onSubmit={(bankName) => handleUpdate({ bankName }, item.id)}
            />
          </Td>

          <ActionsColumn
            merchantListVariables={variables}
            merchantListQuery={data}
            merchant={item}
          />
        </Tr>
      )}
    />
  )
}

export default MerchantList
