import { gql } from '@apollo/client'

import * as Fragments from 'src/graphql/fragments'

export const CREATE_CLIENT_QUERY = gql`
  mutation createOneClient($data: ClientCreateInput!) {
    client: createOneClient(data: $data) {
      ...ClientContent
    }
  }
  ${Fragments.ClientContent}
`
