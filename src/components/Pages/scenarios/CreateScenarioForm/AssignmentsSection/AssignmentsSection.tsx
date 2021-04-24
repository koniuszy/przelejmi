import React, { FC } from 'react'

import { Flex, Text, Box, SimpleGrid, Divider, Skeleton, VStack } from '@chakra-ui/react'

import { usePaginatedMerchantListQuery, usePaginatedClientListQuery } from 'src/generated/graphql'

import ClientSelect from './ClientSelect'
import MerchantSelect from './MerchantSelect'

const SkeletonsStack: FC = () => (
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

type AssignmentProps = {
  assignments: Assignments
  onAssign(data: Partial<Assignments>): void
}

const MerchantSection: FC<AssignmentProps> = ({ onAssign, assignments }) => {
  const merchantQuery = usePaginatedMerchantListQuery({
    variables: { skip: 0, take: 100 },
  })
  return (
    <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold" fontSize="lg">
          Total Merchants: {merchantQuery.data?.paginatedMerchantList.totalCount}
        </Text>

        {assignments.merchantId && (
          <Text fontWeight="bold">
            {
              merchantQuery.data?.paginatedMerchantList.list.find(
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
            {merchantQuery.data?.paginatedMerchantList.list.map((merchantListItem) => (
              <MerchantSelect
                key={merchantListItem.id}
                merchant={merchantListItem}
                assignments={assignments}
                onAssign={onAssign}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <Divider />
    </Box>
  )
}

const ClientSection: FC<AssignmentProps> = ({ onAssign, assignments }) => {
  const clientQuery = usePaginatedClientListQuery({
    variables: { skip: 0, take: 100 },
  })

  return (
    <Box shadow="dark-lg" borderRadius={5} bg="gray.700" p={6}>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold" fontSize="lg">
          Total Clients: {clientQuery.data?.paginatedClientList.totalCount}
        </Text>

        {assignments.clientId && (
          <Text fontWeight="bold">
            {
              clientQuery.data?.paginatedClientList.list.find(
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
            {clientQuery.data?.paginatedClientList.list.map((clientListItem) => (
              <ClientSelect
                key={clientListItem.id}
                client={clientListItem}
                assignments={assignments}
                onAssign={onAssign}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <Divider />
    </Box>
  )
}

const AssignmentsSection: FC<AssignmentProps> = (props) => (
  <>
    <MerchantSection {...props} />
    <ClientSection {...props} />
  </>
)

export default AssignmentsSection

// typescript allows to do: merchantQuery.data.paginatedMerchantList.
// should convert onSave to merchantQuery.data?.paginatedMerchantList.
