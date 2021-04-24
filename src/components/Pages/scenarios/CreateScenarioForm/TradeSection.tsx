import React, { FC } from 'react'

import {
  Flex,
  Text,
  Divider,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import { Scenario, Unit } from 'src/generated/graphql'

export type Trade = Pick<Scenario, 'unitType' | 'amount' | 'netPerOne' | 'VAT'>

const TradeSection: FC<{ trade: Trade; onTradeChange(data: Partial<Trade>): void }> = ({
  trade,
  onTradeChange,
}) => (
  <>
    <Flex justifyContent="space-between">
      <Text fontWeight="bold" fontSize="lg">
        Trade
      </Text>
    </Flex>
    <Divider my={4} />
    <Text fontSize={12} fontWeight={500}>
      Unit type
    </Text>
    <Select
      value={trade.unitType}
      onChange={(e) => onTradeChange({ unitType: e.target.value as Unit })}
    >
      {Object.entries(Unit).map(([key, value]) => (
        <option key={value} value={value}>
          {key}
        </option>
      ))}
    </Select>
    <Text mt={4} fontSize={12} fontWeight={500}>
      Amount
    </Text>
    <NumberInput value={trade.amount} onChange={(v) => onTradeChange({ amount: Number(v) })}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>

    <Text mt={4} fontSize={12} fontWeight={500}>
      VAT
    </Text>
    <Select>
      <option value="0%">0%</option>
      <option value="23%">23%</option>
      <option value="np">np</option>
      <option value="zw">zw</option>
    </Select>
    <Text mt={4} fontSize={12} fontWeight={500}>
      Net per one
    </Text>
    <NumberInput defaultValue={1}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
    <Text mt={4} fontSize={12} fontWeight={500}>
      Total
    </Text>
    <NumberInput>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </>
)
export default TradeSection
