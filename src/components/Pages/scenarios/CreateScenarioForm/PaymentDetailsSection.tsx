import React, { FC } from 'react'

import { Flex, Text, Divider, Textarea, Select } from '@chakra-ui/react'

const PaymentDetailsSection: FC = () => (
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
    <Select defaultValue="transfer">
      <option value="transfer">transfer</option>
      <option value="cash">cash</option>
    </Select>
    <Text mt={4} fontSize={12} fontWeight={500}>
      Due date (days)
    </Text>
    <Select defaultValue="3">
      <option value="3">3</option>
      <option value="1">1</option>
      <option value="5">5</option>
      <option value="7">7</option>
      <option value="10">10</option>
      <option value="14">14</option>
      <option value="21">21</option>
      <option value="30">30</option>
      <option value="60">60</option>
      <option value="90">90</option>
    </Select>
    <Flex mt={4} justifyContent="space-between">
      <Text fontWeight="bold" fontSize="lg">
        Notes
      </Text>
    </Flex>
    <Divider my={4} />
    <Textarea />
  </>
)

export default PaymentDetailsSection
