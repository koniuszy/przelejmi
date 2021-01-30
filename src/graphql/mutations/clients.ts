import { gql } from '@apollo/client'

import * as Fragments from 'src/graphql/fragments'

export const CREATE_CLIENT_MUTATION = gql`
  mutation createOneClient($data: ClientCreateInput!) {
    createdClient: createOneClient(data: $data) {
      ...ClientContent
    }
  }
  ${Fragments.ClientContent}
`

export const UPDATE_CLIENT_MUTATION = gql`
  mutation updateOneClient($data: ClientUpdateInput!, $id: Int!, $where: ClientWhereInput) {
    updatedClient: updateOneClient(data: $data, where: { id: $id }, where: $where) {
      ...ClientContent
    }
  }
  ${Fragments.ClientContent}
`