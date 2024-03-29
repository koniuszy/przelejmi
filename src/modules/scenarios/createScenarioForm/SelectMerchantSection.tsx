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

import { useMerchantListQuery } from 'src/generated/hasura'

const SkeletonsStack: FC = () => (
  <VStack mt="2" spacing={4} align="stretch">
    <Skeleton height="40px" />
    <Skeleton height="40px" />
    <Skeleton height="40px" />
    <Skeleton height="40px" />
  </VStack>
)

const MerchantSelect: FC<{
  onMerchantSelect: (id: number | null) => void
  merchant: MerchantContentFragment
  isSelected: boolean
}> = ({ merchant, isSelected, onMerchantSelect }) => (
  <React.Fragment key={merchant.id}>
    <Center justifyContent="flex-start">{merchant.companyName}</Center>
    <Center justifyContent="flex-start">{merchant.issuerName}</Center>
    <Center justifyContent="flex-start">{merchant.vatId}</Center>
    <Button
      colorScheme={isSelected ? 'green' : 'blue'}
      onClick={() => {
        if (isSelected) {
          onMerchantSelect(null)
          return
        }

        onMerchantSelect(merchant.id)
      }}
    >
      {isSelected ? 'Selected' : 'Select'}
    </Button>
  </React.Fragment>
)

const SelectMerchantSection: FC<{
  selectedMerchantId: number | null
  onMerchantSelect: (id: number | null) => void
}> = ({ onMerchantSelect, selectedMerchantId }) => {
  const { data, loading } = useMerchantListQuery({ fetchPolicy: 'cache-and-network' })

  return (
    <>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold" fontSize="lg">
          Total Merchants: {data?.totalCount}
        </Text>

        {selectedMerchantId && (
          <Text fontWeight="bold">
            {data?.merchantList.find(({ id }) => id === selectedMerchantId)?.companyName}
          </Text>
        )}
      </Flex>

      <Divider my={4} />

      <Box h="200px" overflow="auto">
        {loading ? (
          <SkeletonsStack />
        ) : (
          <SimpleGrid my="2" columns={4} spacing={10}>
            {data?.merchantList.map((merchantListItem) => (
              <MerchantSelect
                key={merchantListItem.id}
                merchant={merchantListItem}
                isSelected={selectedMerchantId === merchantListItem.id}
                onMerchantSelect={onMerchantSelect}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  )
}

export default SelectMerchantSection
