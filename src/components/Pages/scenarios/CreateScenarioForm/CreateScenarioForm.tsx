import React, { FC, useState } from 'react'

import { Button, Box, SimpleGrid, Divider, Flex, Text, Textarea } from '@chakra-ui/react'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import { Unit, Vat, Currency, PaymentType, useCreateScenarioMutation } from 'src/generated/graphql'
import { OptimizedImg } from 'src/types'

import ImageSection from './ImageSection'
import PaymentDetailsSection, { PaymentDetails } from './PaymentDetailsSection'
import SelectClientSection from './SelectClientSection'
import SelectMerchantSection from './SelectMerchantSection'
import TradeSection, { Trade } from './TradeSection'

const CreateScenarioForm: FC<{ optimizedImg: OptimizedImg }> = ({ optimizedImg }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [clientId, setClientId] = useState<number | null>(null)
  const [merchantId, setMerchantId] = useState<number | null>(null)

  const [trade, setTrade] = useState<Trade>({
    unitType: Unit.Item,
    VAT: Vat.Percent_23,
    netPerOne: 1000,
    currency: Currency.Pln,
  })

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    dueDateDays: 5,
    notes: '',
    paymentType: PaymentType.Transfer,
  })

  const [createScenario, { loading }] = useCreateScenarioMutation({
    onCompleted() {},
    onError() {},
  })

  return (
    <>
      <SimpleGrid columns={2} spacing={10}>
        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <SelectMerchantSection selectedMerchantId={merchantId} onMerchantSelect={setMerchantId} />
          <Divider />
        </Box>

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <SelectClientSection selectedClientId={clientId} onClientSelect={setClientId} />
          <Divider />
        </Box>

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <TradeSection
            trade={trade}
            optimizedImg={optimizedImg}
            onTradeChange={(data) => setTrade((prev) => ({ ...prev, ...data }))}
          />
        </Box>

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <ImageSection imageUrl={imageUrl} onImageUrlChange={setImageUrl} />
        </Box>

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <PaymentDetailsSection
            paymentDetails={paymentDetails}
            onPaymentDetailsChange={(data) => setPaymentDetails((prev) => ({ ...prev, ...data }))}
          />
        </Box>

        <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
          <Flex mt={4} justifyContent="space-between">
            <Text fontWeight="bold" fontSize="lg">
              Notes
            </Text>
          </Flex>
          <Divider my={4} />
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Box>
      </SimpleGrid>

      <Button
        isLoading={loading}
        mt={10}
        size="lg"
        m="auto"
        colorScheme="teal"
        display="block"
        onClick={() =>
          createScenario({ variables: { data: { ...trade, ...paymentDetails, notes, imageUrl } } })
        }
      >
        Create
      </Button>
    </>
  )
}

export default CreateScenarioForm
