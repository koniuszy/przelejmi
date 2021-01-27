import { gql } from '@apollo/client'

export const CLIENTS_QUERY = gql`
  {
    clientList: clients {
      id
      name
      address
      postCode
      city
      country
      nip
    }
  }
`
