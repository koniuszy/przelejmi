import React, { FC } from 'react'

import { Flex, Text, Divider, Button } from '@chakra-ui/react'

import { PaymentType, Scenario } from 'src/generated/graphql'

export type PaymentDetails = Pick<Scenario, 'paymentType' | 'dueDateDays' | 'notes'>

const PaymentDetailsSection: FC<{
  paymentDetails: PaymentDetails
  onPaymentDetailsChange: (data: Partial<PaymentDetails>) => void
}> = ({ paymentDetails, onPaymentDetailsChange }) => (
  <>
    <Flex mt={4} justifyContent="space-between">
      <Text fontWeight="bold" fontSize="lg">
        Payment details
      </Text>
    </Flex>
    <Divider my={4} />

    <Text fontSize={12} fontWeight={500}>
      Payment type
    </Text>
    <Flex>
      {Object.keys(PaymentType).map((paymentTypeKey) => (
        <Button
          key={paymentTypeKey}
          mr={5}
          colorScheme={
            paymentDetails.paymentType === PaymentType[paymentTypeKey] ? 'green' : 'blue'
          }
          onClick={() => onPaymentDetailsChange({ paymentType: PaymentType[paymentTypeKey] })}
        >
          {paymentTypeKey}
        </Button>
      ))}
    </Flex>

    <Text mt={4} fontSize={12} fontWeight={500}>
      Due date (days)
    </Text>
    <Flex>
      {[1, 3, 5, 7, 10, 14, 21, 30, 60, 90].map((days) => (
        <Button
          key={days}
          mr={5}
          colorScheme={paymentDetails.dueDateDays === days ? 'green' : 'blue'}
          onClick={() => onPaymentDetailsChange({ dueDateDays: days })}
        >
          {days}
        </Button>
      ))}
    </Flex>
  </>
)

export default PaymentDetailsSection
