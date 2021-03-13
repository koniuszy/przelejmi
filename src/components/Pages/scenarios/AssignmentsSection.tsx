import React, { FC } from 'react'

import {
  Flex,
  Button,
  Text,
  Box,
  SimpleGrid,
  Divider,
  Skeleton,
  VStack,
  Center,
} from '@chakra-ui/react'

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

export type Assignments = {
  clientId: number | null
  merchantId: number | null
}

const AssignmentsSection: FC<{
  assignments: Assignments
  onAssign(data: Partial<Assignments>): void
}> = ({ onAssign, assignments }) => {
  const merchantQuery = usePaginatedMerchantListQuery({
    variables: { skip: 0, take: 100 },
  })
  const clientQuery = usePaginatedClientListQuery({
    variables: { skip: 0, take: 100 },
  })

  const renderMerchantSelects = (merchant: MerchantContentFragment) => {
    const isSelected = assignments.merchantId === merchant.id
    return (
      <React.Fragment key={merchant.id}>
        <Center justifyContent="flex-start">{merchant.companyName}</Center>
        <Center justifyContent="flex-start">{merchant.issuerName}</Center>
        <Center justifyContent="flex-start">{merchant.VATId}</Center>
        <Button
          colorScheme={isSelected ? 'green' : 'blue'}
          onClick={() => {
            if (isSelected) {
              onAssign({ merchantId: null })
              return
            }

            onAssign({ merchantId: merchant.id })
          }}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </React.Fragment>
    )
  }

  const renderClientSelect = (client: ClientContentFragment) => {
    const isSelected = assignments.clientId === client.id
    return (
      <React.Fragment key={client.id}>
        <Center justifyContent="flex-start">{client.name}</Center>
        <Center justifyContent="flex-start">{client.VATId}</Center>
        <Button
          colorScheme={isSelected ? 'green' : 'blue'}
          onClick={() => {
            if (isSelected) {
              onAssign({ clientId: null })
              return
            }

            onAssign({ clientId: client.id })
          }}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </React.Fragment>
    )
  }

  return (
    <>
      <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="lg">
            Total Merchants: {merchantQuery.data?.paginatedMerchantList.totalCount}
          </Text>

          {assignments.merchantId && (
            <Text fontWeight="bold">
              {
                merchantQuery.data.paginatedMerchantList.list.find(
                  ({ id }) => id === assignments.merchantId
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

          {assignments.clientId && (
            <Text fontWeight="bold">
              {
                clientQuery.data.paginatedClientList.list.find(
                  ({ id }) => id === assignments.clientId
                ).name
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
    </>
  )
}

export default AssignmentsSection
