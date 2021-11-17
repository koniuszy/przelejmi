import React, { FC } from 'react'

import {
  Flex,
  Text,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react'

import { Scenario, Unit, Vat, Currency } from 'src/generated/graphql'

export type Trade = Pick<Scenario, 'unitType' | 'netPerOne' | 'VAT' | 'currency'>

function getVatValue(vatKey: keyof Vat) {
  if (Vat[vatKey] === Vat.Percent_0) return '0%'
  if (Vat[vatKey] === Vat.Percent_8) return '8%'
  if (Vat[vatKey] === Vat.Percent_23) return '23%'
  if (Vat[vatKey] === Vat.DoesNotConcern) return 'np'
  if (Vat[vatKey] === Vat.Freed) return 'zw'

  return vatKey
}

function getGrossValue(trade: Trade) {
  const { netPerOne, VAT } = trade
  let value = 0

  if (VAT === Vat.Percent_23) value = Math.round(netPerOne * 0.23 * 100) / 100
  if (VAT === Vat.Percent_8) value = Math.round(netPerOne * 0.8 * 100) / 100
  if (!value) return null
  return `+ ${value} ${trade.currency} VAT`
}

const TradeSection: FC<{
  trade: Trade
  onTradeChange: (data: Partial<Trade>) => void
}> = ({ trade, onTradeChange }) => (
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
    <Flex>
      {Object.keys(Unit).map((unitKey) => (
        <Button
          key={unitKey}
          mr={5}
          colorScheme={trade.unitType === Unit[unitKey] ? 'green' : 'blue'}
          onClick={() => onTradeChange({ unitType: Unit[unitKey] })}
        >
          {unitKey}
        </Button>
      ))}
    </Flex>

    <Text mt={4} fontSize={12} fontWeight={500}>
      VAT
    </Text>
    {Object.keys(Vat).map((vatKey) => (
      <Button
        key={vatKey}
        mr={5}
        colorScheme={trade.VAT === Vat[vatKey] ? 'green' : 'blue'}
        onClick={() => onTradeChange({ VAT: Vat[vatKey] })}
      >
        {getVatValue(vatKey as keyof Vat)}
      </Button>
    ))}

    <Text mt={4} fontSize={12} fontWeight={500}>
      Currency
    </Text>
    {Object.keys(Currency).map((currencyKey) => (
      <Button
        key={currencyKey}
        mr={5}
        colorScheme={trade.currency === Currency[currencyKey] ? 'green' : 'blue'}
        onClick={() => onTradeChange({ currency: Currency[currencyKey] })}
      >
        {Currency[currencyKey]}
      </Button>
    ))}

    <Text mt={4} fontSize={12} fontWeight={500}>
      Net per one
    </Text>
    <InputGroup mb={4}>
      <NumberInput
        value={trade.netPerOne}
        width="70%"
        onChange={(e) => onTradeChange({ netPerOne: Number(e) })}
      >
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
        <NumberInputField />
      </NumberInput>
      {getGrossValue(trade) && <InputRightAddon>{getGrossValue(trade)}</InputRightAddon>}
    </InputGroup>
  </>
)
export default TradeSection
