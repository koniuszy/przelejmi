import { gql } from '@apollo/client'

import * as Fragments from 'src/graphql/fragments'

export const CLIENTS_QUERY = gql`
  {
    clientList: clients {
      ...ClientContent
    }
  }
  ${Fragments.ClientContent}
`
