import { gql } from '@apollo/client'

import * as Fragments from 'src/graphql/fragments'

export const CREATE_MERCHANT_MUTATION = gql`
  mutation createOneMerchant($data: MerchantCreateInput!) {
    createdMerchant: createOneMerchant(data: $data) {
      ...MerchantContent
    }
  }
  ${Fragments.MerchantContent}
`

export const UPDATE_MERCHANT_MUTATION = gql`
  mutation updateOneMerchant($data: MerchantUpdateInput!, $id: Int!, $where: MerchantWhereInput) {
    updatedMerchant: updateOneMerchant(data: $data, where: { id: $id }, where: $where) {
      ...MerchantContent
    }
  }
  ${Fragments.MerchantContent}
`
