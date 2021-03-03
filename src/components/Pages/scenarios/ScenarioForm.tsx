import React, { FC } from 'react'

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
} from '@chakra-ui/react'

import { useFormik } from 'formik'

import { errorToastContent, successToastContent } from 'src/lib/toastContent'

import {
  useCreateMerchantMutation,
  PaginatedMerchantListDocument,
  PaginatedMerchantListQuery,
} from 'src/generated/graphql'
import { OptimizedImg } from 'src/types'

import BlurredImg from 'src/components/BlurredImg'

const CreateScenarioForm: FC = () => {
  return (
    <SimpleGrid columns={2} spacing={10}>
      <Box>
        <Text>Clients</Text>
        <Box bg="gray.600" />
      </Box>
      <Box bg="tomato" height="80px" />
      <Box bg="tomato" height="80px" />
      <Box bg="tomato" height="80px" />
      <Box bg="tomato" height="80px" />
    </SimpleGrid>
  )
}

export default CreateScenarioForm
