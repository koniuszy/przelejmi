import React, { FC, useState } from 'react'

import {
  Flex,
  Input,
  Button,
  Text,
  Box,
  SimpleGrid,
  Divider,
  Textarea,
  Image,
  Select,
} from '@chakra-ui/react'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import { Unit, Vat } from 'src/generated/graphql'

import AssignmentsSection from './AssignmentsSection'
import TradeSection, { Trade } from './TradeSection'

const CreateScenarioForm: FC = () => {
  const [assignments, setAssignments] = useState<{
    clientId: number | null
    merchantId: number | null
  }>({ clientId: null, merchantId: null })

  const [trade, setTrade] = useState<Trade>({
    unitType: Unit.Item,
    VAT: Vat.Percent_23,
    amount: 1,
    netPerOne: 1000,
  })
  const [imgSrc, setImgSrc] = useState('')

  return (
    <>
      <SimpleGrid columns={2} spacing={10}>
        <AssignmentsSection
          assignments={assignments}
          onAssign={(data) => setAssignments((prev) => ({ ...prev, ...data }))}
        />

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <TradeSection
            trade={trade}
            onTradeChange={(data) => setTrade((prev) => ({ ...prev, ...data }))}
          />

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
        </Box>

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <Flex justifyContent="space-between">
            <Text fontWeight="bold" fontSize="lg">
              Image URL
            </Text>
          </Flex>
          <Divider my={4} />

          <Input
            placeholder="https://images.example.com"
            value={imgSrc}
            mb={4}
            onChange={(e) => setImgSrc(e.target.value)}
          />

          {imgSrc && (
            <Image
              mx="auto"
              objectFit="cover"
              align="center"
              w={300}
              h={400}
              mt={5}
              borderRadius={5}
              src={imgSrc}
            />
          )}
        </Box>
      </SimpleGrid>

      <Button size="lg" mt={10} colorScheme="teal" ml="auto" display="block">
        Create
      </Button>
    </>
  )
}

export default CreateScenarioForm
