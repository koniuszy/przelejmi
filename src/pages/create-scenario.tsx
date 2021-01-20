import React, { FC } from 'react'

import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Select,
  FormErrorMessage,
  Button,
  Grid,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Center,
  Box,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

const App: FC = () => {
  const { register, handleSubmit, watch, errors, formState } = useForm()

  function onSubmit(values) {
    console.log(values)
  }

  return (
    <div>
      <Head>
        <title>Create scenario!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <FormControl id="name" isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                name="name"
                placeholder="My own scenario"
                ref={register({
                  validate: (value) =>
                    value.length > 100 ? 'Name is too long - max 100chars' : true,
                })}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <RadioGroup
              display="flex"
              flexDirection="column"
              alignItems="center"
              defaultValue="transfer"
            >
              <Text>Payment Type</Text>
              <Stack pt="3" spacing={5} direction="row">
                <Radio value="cash">Cash</Radio>
                <Radio defaultChecked value="transfer">
                  Transfer
                </Radio>
              </Stack>
            </RadioGroup>

            <RadioGroup
              display="flex"
              flexDirection="column"
              alignItems="center"
              defaultValue="transfer"
            >
              <Text>Currency</Text>
              <Stack pt="3" spacing={5} direction="row">
                <Radio colorScheme="green" defaultChecked value="PLN">
                  PLN
                </Radio>
                <Radio colorScheme="green" value="Euro">
                  Euro
                </Radio>
              </Stack>
            </RadioGroup>
          </Grid>

          <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </main>
    </div>
  )
}

export default App
