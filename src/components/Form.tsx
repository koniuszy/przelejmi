import { FC } from 'react'

import { FormControl, FormLabel, FormErrorMessage, Input, FormControlProps } from '@chakra-ui/react'

import { ErrorMessage, Field } from 'formik'

export const FormField: FC<{
  id: string
  label: string
  placeholder: string
  isRequired?: boolean
}> = ({ id, label, placeholder, isRequired }) => (
  <Field name={id}>
    {({ field, form: { errors } }) => (
      <FormControl isRequired={isRequired} id={id} isInvalid={Boolean(errors[id])}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input name={id} placeholder={placeholder} {...field} />
        <FormErrorMessage>
          <ErrorMessage name={id} />
        </FormErrorMessage>
      </FormControl>
    )}
  </Field>
)
