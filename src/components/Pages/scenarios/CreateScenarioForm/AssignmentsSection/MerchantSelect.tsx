import React, { FC } from 'react'

import { Button, Center } from '@chakra-ui/react'

import { MerchantContentFragment } from 'src/generated/graphql'

import { Assignments } from './AssignmentsSection'

const MerchantSelect: FC<{
  assignments: Assignments
  onAssign(data: Partial<Assignments>): void
  merchant: MerchantContentFragment
}> = ({ assignments, merchant, onAssign }) => {
  const isSelected = assignments.merchantId === merchant.id

  return (
    <React.Fragment key={merchant.id}>
      <Center justifyContent="flex-start">{merchant.companyName}</Center>
      <Center justifyContent="flex-start">{merchant.issuerName}</Center>
      <Center justifyContent="flex-start">{merchant.VATId}</Center>
      <Button
        colorScheme={isSelected ? 'green' : 'blue'}
        onClick={() => {
          if (isSelected) {
            onAssign({ merchantId: null })
            return
          }

          onAssign({ merchantId: merchant.id })
        }}
      >
        {isSelected ? 'Selected' : 'Select'}
      </Button>
    </React.Fragment>
  )
}

export default MerchantSelect
