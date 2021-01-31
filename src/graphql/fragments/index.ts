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
    companyName
    address
    postCode
    city
    country
    nip
    issuerName
    bankAccountPln
    bankAccountEur
    bankName
  }
`
