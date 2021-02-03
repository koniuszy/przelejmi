import React, { FC } from 'react'

import Head from 'next/head'

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Grid,
  RadioGroup,
  Stack,
  Radio,
  Text,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'

import { useFormik } from 'formik'
import { Scenario } from 'prisma/prisma-client'

import { Currency, VAT, PaymentType, Unit } from 'src/types'

type Form = Pick<Scenario, 'name' | 'netPerOne' | 'amount'> & {
  currency: Currency
  VAT: VAT
  paymentType: PaymentType
}

const App: FC = () => {
  const { handleSubmit, errors, values, handleChange, isSubmitting, setValues } = useFormik<Form>({
    validateOnBlur: true,
    initialValues: {
      currency: Currency.PLN,
      VAT: VAT['23%'],
      paymentType: PaymentType.TRANSFER,
      netPerOne: 10000,
      name: '',
      amount: 1,
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validate: (values) => {
      //@ts-ignore
      const errors: Record<keyof Form, string> = {}

      if (values.name.length > 100) errors.name = 'Name should be shorter'
      if (isNaN(values.netPerOne) || values.netPerOne < 1) errors.netPerOne = 'Invalid value'

      return errors
    },
  })

  return (
    <>
      <Head>
        <title>przelejmi | Create scenario</title>
      </Head>

      <main>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <FormControl id="name" isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                name="name"
                placeholder="My own scenario"
                value={values.name}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <RadioGroup
              defaultValue={PaymentType.TRANSFER}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text>Payment Type</Text>
              <Stack pt="3" spacing={5} direction="row">
                {Object.values(PaymentType).map((value) => (
                  <Radio key={value} value={value}>
                    {value}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <RadioGroup
              defaultValue={Currency.PLN}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text>Currency</Text>
              <Stack pt="3" spacing={5} direction="row">
                {Object.values(Currency).map((value) => (
                  <Radio key={value} colorScheme="green" value={value}>
                    {value}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <FormControl id="netPerOne" isInvalid={!!errors.netPerOne}>
              <FormLabel htmlFor="netPerOne">Net price per one unit</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="0.8rem"
                  children={values.currency}
                />
                <NumberInput
                  value={values.netPerOne.toLocaleString('pl-PL')}
                  onChange={(e) => setValues({ ...values, netPerOne: Number(e) }, true)}
                >
                  <NumberInputField pl="10" />
                </NumberInput>
              </InputGroup>
              <FormErrorMessage>{errors.netPerOne}</FormErrorMessage>
            </FormControl>

            <RadioGroup
              defaultValue={VAT['23%']}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text>VAT</Text>
              <Stack pt="3" spacing={5} direction="row">
                {Object.values(VAT).map((value) => (
                  <Radio key={value} value={value}>
                    {value}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <FormControl id="amount" isInvalid={!!errors.amount}>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <NumberInput
                value={values.amount.toLocaleString('pl-PL')}
                onChange={(e) => setValues({ ...values, amount: Number(e) }, true)}
              >
                <NumberInputField />
              </NumberInput>
              <FormErrorMessage>{errors.amount}</FormErrorMessage>
            </FormControl>

            <RadioGroup
              defaultValue={Unit.HOURS}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text>Unit type</Text>
              <Stack pt="3" spacing={5} direction="row">
                {Object.values(Unit).map((value) => (
                  <Radio key={value} value={value}>
                    {value}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Grid>

          <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </main>
    </>
  )
}

export default App
