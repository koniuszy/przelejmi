import React, { FC, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Button, Box, SimpleGrid, Divider, Flex, Text, Textarea, useToast } from '@chakra-ui/react'

import ImageSection from 'scenarios/createScenarioForm/ImageSection'
import PaymentDetailsSection, {
  PaymentDetails,
} from 'scenarios/createScenarioForm/PaymentDetailsSection'
import SelectClientSection from 'scenarios/createScenarioForm/SelectClientSection'
import SelectMerchantSection from 'scenarios/createScenarioForm/SelectMerchantSection'
import TradeSection, { Trade } from 'scenarios/createScenarioForm/TradeSection'

import { Unit, Vat, Currency, PaymentType, useCreateScenarioMutation } from 'src/generated/graphql'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

const CreateScenarioForm: FC = () => {
  const toast = useToast()
  const router = useRouter()

  const [imgUrl, setImgUrl] = useState(
    'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  )
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
    onCompleted() {
      toast({ ...successToastContent, description: 'Scenario has been created' })
      router.push('/scenarios')
    },
    onError(e) {
      toast({ ...errorToastContent, description: e.message })
    },
  })

  function handleCreate() {
    let errorMsg = ''
    if (!clientId) errorMsg = 'Client is not selected'
    if (!merchantId) errorMsg = 'Merchant is not selected'
    if (!imgUrl) errorMsg = 'Image URL is missing'

    if (errorMsg) {
      toast({ ...errorToastContent, description: errorMsg })
      return
    }

    createScenario({
      variables: {
        data: {
          ...trade,
          ...paymentDetails,
          notes,
          imgUrl,
          name: 'test',
          client: { connect: { id: clientId } },
          merchant: { connect: { id: merchantId } },
        },
      },
    })
  }

  return (
    <SimpleGrid position="relative" columns={2} spacing={10}>
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
          onTradeChange={(data) => setTrade((prev) => ({ ...prev, ...data }))}
        />
      </Box>

      <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
        <ImageSection imgUrl={imgUrl} onImgUrlChange={setImgUrl} />
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
      <Button
        position="fixed"
        bottom={170}
        right={100}
        m="auto"
        size="lg"
        display="block"
        colorScheme="teal"
        mt={10}
        isLoading={loading}
        onClick={handleCreate}
      >
        Create
      </Button>
    </SimpleGrid>
  )
}

const CreateScenarioPage: FC = () => (
  <>
    <Head>
      <title>Create scenario | przelejmi</title>
    </Head>

    <main>
      <CreateScenarioForm />
    </main>
  </>
)

export default CreateScenarioPage
