import { gql } from '@apollo/client'

import * as Fragments from 'src/graphql/fragments'

export const CLIENTS_QUERY = gql`
  query getClients($orderBy: [ClientOrderByInput!]) {
    clientList: clients(orderBy: $orderBy) {
      ...ClientContent
    }
  }
  ${Fragments.ClientContent}
`
