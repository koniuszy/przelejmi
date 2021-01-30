import { gql } from '@apollo/client'

import * as Fragments from 'src/graphql/fragments'

export const MERCHANTS_QUERY = gql`
  query getMerchants($orderBy: [MerchantOrderByInput!], $where: MerchantWhereInput) {
    merchantList: merchants(orderBy: $orderBy, where: $where) {
      ...MerchantContent
    }
  }
  ${Fragments.MerchantContent}
`
