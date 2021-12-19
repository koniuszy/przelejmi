import React, { FC } from 'react'

import { Flex, Text, Divider, Button } from '@chakra-ui/react'

enum Currency {}
enum PaymentType {}

const PaymentDetailsSection: FC<{
  paymentType: PaymentType
  onPaymentTypeChange: (data: PaymentType) => void
  currency: Currency
  onCurrencyChange: (data: Currency) => void
  dueDateDays: number
  onDueDateDays: (d: number) => void
}> = ({
  paymentType,
  onPaymentTypeChange,
  currency,
  onCurrencyChange,
  dueDateDays,
  onDueDateDays,
}) => (
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
          colorScheme={paymentType === PaymentType[paymentTypeKey] ? 'green' : 'blue'}
          onClick={() => onPaymentTypeChange(PaymentType[paymentTypeKey])}
        >
          {paymentTypeKey}
        </Button>
      ))}
    </Flex>

    <Text mt={4} fontSize={12} fontWeight={500}>
      Currency
    </Text>
    {Object.keys(Currency).map((currencyKey) => (
      <Button
        key={currencyKey}
        mr={5}
        colorScheme={currency === Currency[currencyKey] ? 'green' : 'blue'}
        onClick={() => onCurrencyChange(Currency[currencyKey])}
      >
        {Currency[currencyKey]}
      </Button>
    ))}

    <Text mt={4} fontSize={12} fontWeight={500}>
      Due date (days)
    </Text>
    <Flex>
      {[1, 3, 5, 7, 10, 14, 21, 30, 60, 90].map((days) => (
        <Button
          key={days}
          mr={5}
          colorScheme={dueDateDays === days ? 'green' : 'blue'}
          onClick={() => onDueDateDays(days)}
        >
          {days}
        </Button>
      ))}
    </Flex>
  </>
)

export default PaymentDetailsSection
