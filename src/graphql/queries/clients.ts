import { gql } from '@apollo/client'

import * as Fragments from 'src/graphql/fragments'

export const CLIENTS_QUERY = gql`
  query getClients($orderBy: [ClientOrderByInput!], $where: ClientWhereInput) {
    clientList: clients(orderBy: $orderBy, where: $where) {
      ...ClientContent
    }
  }
  ${Fragments.ClientContent}
`
