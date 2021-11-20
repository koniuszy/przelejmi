import { FC } from 'react'

import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react'

import { ErrorMessage, Field } from 'formik'

export const FormField: FC<{
  id: string
  label: string
  placeholder: string
  isRequired?: boolean
  isDisabled?: boolean
}> = ({ id, label, placeholder, isRequired, isDisabled }) => (
  <Field name={id}>
    {({ field, form: { errors, touched } }) => (
      <FormControl
        isDisabled={isDisabled}
        isRequired={isRequired}
        id={id}
        isInvalid={Boolean(errors[id] && touched[id])}
      >
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input name={id} placeholder={placeholder} {...field} />
        <FormErrorMessage>
          <ErrorMessage name={id} />
        </FormErrorMessage>
      </FormControl>
    )}
  </Field>
)
