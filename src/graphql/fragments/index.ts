import { gql } from '@apollo/client'

export const ClientContent = gql`
  fragment ClientContent on Client {
    id
    name
    address
    postCode
    city
    country
    nip
  }
`
