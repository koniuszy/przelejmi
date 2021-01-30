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

export const MerchantContent = gql`
  fragment MerchantContent on Merchant {
    id
    name
    address
    postCode
    city
    country
    nip
  }
`
