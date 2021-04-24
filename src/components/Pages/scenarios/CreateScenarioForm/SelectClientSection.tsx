import React, { FC } from 'react'

import {
  Flex,
  Text,
  Box,
  SimpleGrid,
  Divider,
  Skeleton,
  VStack,
  Button,
  Center,
} from '@chakra-ui/react'

import { ClientContentFragment, usePaginatedClientListQuery } from 'src/generated/graphql'

const SkeletonsStack: FC = () => (
  <VStack mt="2" spacing={4} align="stretch">
    <Skeleton height="40px" />
    <Skeleton height="40px" />
    <Skeleton height="40px" />
    <Skeleton height="40px" />
  </VStack>
)

const ClientSelect: FC<{
  isSelected: boolean
  onClientSelect(id: number | null): void
  client: ClientContentFragment
}> = ({ client, isSelected, onClientSelect }) => (
  <React.Fragment key={client.id}>
    <Center justifyContent="flex-start">{client.name}</Center>
    <Center justifyContent="flex-start">{client.VATId}</Center>
    <Button
      colorScheme={isSelected ? 'green' : 'blue'}
      onClick={() => {
        if (isSelected) {
          onClientSelect(null)
          return
        }

        onClientSelect(client.id)
      }}
    >
      {isSelected ? 'Selected' : 'Select'}
    </Button>
  </React.Fragment>
)

const SelectClientSection: FC<{ selectedClientId: number; onClientSelect(id: number): void }> = ({
  selectedClientId,
  onClientSelect,
}) => {
  const clientQuery = usePaginatedClientListQuery({
    variables: { skip: 0, take: 100 },
  })
  return (
    <>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold" fontSize="lg">
          Total Clients: {clientQuery.data?.paginatedClientList.totalCount}
        </Text>

        {selectedClientId && (
          <Text fontWeight="bold">
            {
              clientQuery.data?.paginatedClientList.list.find(({ id }) => id === selectedClientId)
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
            {clientQuery.data?.paginatedClientList.list.map((clientListItem) => (
              <ClientSelect
                key={clientListItem.id}
                client={clientListItem}
                isSelected={selectedClientId === clientListItem.id}
                onClientSelect={onClientSelect}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  )
}

export default SelectClientSection
