import React, { FC, useState } from 'react'

import { Button, Box, SimpleGrid, Divider } from '@chakra-ui/react'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import { Unit, Vat } from 'src/generated/graphql'

import ImageSection from './ImageSection'
import PaymentDetailsSection from './PaymentDetailsSection'
import SelectClientSection from './SelectClientSection'
import SelectMerchantSection from './SelectMerchantSection'
import TradeSection, { Trade } from './TradeSection'

const CreateScenarioForm: FC = () => {
  const [imgSrc, setImgSrc] = useState('')

  const [assignments, setAssignments] = useState<{
    clientId: number | null
    merchantId: number | null
  }>({ clientId: null, merchantId: null })

  const [trade, setTrade] = useState<Trade>({
    unitType: Unit.Item,
    VAT: Vat.Percent_23,
    netPerOne: 1000,
  })

  return (
    <>
      <SimpleGrid columns={2} spacing={10}>
        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <SelectMerchantSection
            selectedMerchantId={assignments.merchantId}
            onMerchantSelect={(merchantId) => setAssignments((prev) => ({ ...prev, merchantId }))}
          />
          <Divider />
        </Box>

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <SelectClientSection
            selectedClientId={assignments.clientId}
            onClientSelect={(clientId) => setAssignments((prev) => ({ ...prev, clientId }))}
          />
          <Divider />
        </Box>

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <TradeSection
            trade={trade}
            onTradeChange={(data) => setTrade((prev) => ({ ...prev, ...data }))}
          />
        </Box>

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <ImageSection imgSrc={imgSrc} onImageSrcChange={setImgSrc} />
        </Box>

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <PaymentDetailsSection />
        </Box>
      </SimpleGrid>

      <Button size="lg" mt={10} colorScheme="teal" display="block">
        Create
      </Button>
    </>
  )
}

export default CreateScenarioForm
