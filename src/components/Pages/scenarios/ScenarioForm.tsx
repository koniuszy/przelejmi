import React, { FC, useState } from 'react'

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
  Text,
  Box,
  SimpleGrid,
  Divider,
  Skeleton,
  VStack,
  Center,
  Textarea,
  Image,
} from '@chakra-ui/react'

import { useFormik } from 'formik'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  usePaginatedMerchantListQuery,
  MerchantContentFragment,
  usePaginatedClientListQuery,
  ClientContentFragment,
} from 'src/generated/graphql'

const SkeletonsStack = () => (
  <VStack mt="2" spacing={4} align="stretch">
    <Skeleton height="40px" />
    <Skeleton height="40px" />
    <Skeleton height="40px" />
    <Skeleton height="40px" />
  </VStack>
)

const CreateScenarioForm: FC = () => {
  const [selectedMerchantId, setSelectedMerchantId] = useState<number | null>(null)
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null)
  const [imgSrc, setImgSrc] = useState('')

  const merchantQuery = usePaginatedMerchantListQuery({
    variables: { skip: 0, take: 100 },
  })
  const clientQuery = usePaginatedClientListQuery({
    variables: { skip: 0, take: 100 },
  })

  const renderMerchantSelects = (merchant: MerchantContentFragment) => {
    const isSelected = selectedMerchantId === merchant.id
    return (
      <React.Fragment key={merchant.id}>
        <Center justifyContent="flex-start">{merchant.companyName}</Center>
        <Center justifyContent="flex-start">{merchant.issuerName}</Center>
        <Center justifyContent="flex-start">{merchant.VATId}</Center>
        <Button
          colorScheme={isSelected ? 'green' : 'blue'}
          onClick={() => {
            if (isSelected) {
              setSelectedMerchantId(null)
              return
            }

            setSelectedMerchantId(merchant.id)
          }}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </React.Fragment>
    )
  }

  const renderClientSelect = (client: ClientContentFragment) => {
    const isSelected = selectedClientId === client.id
    return (
      <React.Fragment key={client.id}>
        <Center justifyContent="flex-start">{client.name}</Center>
        <Center justifyContent="flex-start">{client.VATId}</Center>
        <Button
          colorScheme={isSelected ? 'green' : 'blue'}
          onClick={() => {
            if (isSelected) {
              setSelectedClientId(null)
              return
            }

            setSelectedClientId(client.id)
          }}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </React.Fragment>
    )
  }

  return (
    <SimpleGrid columns={2} spacing={10}>
      <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="lg">
            Total Merchants: {merchantQuery.data?.paginatedMerchantList.totalCount}
          </Text>

          {selectedMerchantId && (
            <Text fontWeight="bold">
              {
                merchantQuery.data.paginatedMerchantList.list.find(
                  ({ id }) => id === selectedMerchantId
                ).companyName
              }
            </Text>
          )}
        </Flex>

        <Divider my={4} />

        <Box h="200px" overflow="auto">
          {merchantQuery.loading ? (
            <SkeletonsStack />
          ) : (
            <SimpleGrid my="2" columns={4} spacing={10}>
              {merchantQuery.data.paginatedMerchantList.list.map(renderMerchantSelects)}
            </SimpleGrid>
          )}
        </Box>
        <Divider />
      </Box>

      <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="lg">
            Total Clients: {clientQuery.data?.paginatedClientList.totalCount}
          </Text>

          {selectedClientId && (
            <Text fontWeight="bold">
              {
                clientQuery.data.paginatedClientList.list.find(({ id }) => id === selectedClientId)
                  .name
              }
            </Text>
          )}
        </Flex>

        <Divider my={4} />

        <Box h="200px" overflow="auto">
          {clientQuery.loading ? (
            <SkeletonsStack />
          ) : (
            <SimpleGrid my="2" columns={3} spacing={10}>
              {clientQuery.data.paginatedClientList.list.map(renderClientSelect)}
            </SimpleGrid>
          )}
        </Box>
        <Divider />
      </Box>

      <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="lg">
            Trade
          </Text>
        </Flex>
        <Divider mt={4} />
        unitType amount VAT netPerOne
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="lg">
            Payment details
          </Text>
        </Flex>
        <Divider mt={4} />
        dueDay paymentType
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="lg">
            Notes
          </Text>
        </Flex>
        <Divider mt={4} />
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
          onChange={(e) => setImgSrc(e.target.value)}
        />

        {imgSrc && <Image mt={5} borderRadius={5} src={imgSrc} />}
      </Box>
    </SimpleGrid>
  )
}

export default CreateScenarioForm
