import { objectType, intArg, arg, extendType } from 'nexus'

import { PaginatedMerchantListQueryVariables } from 'src/generated/graphql'

import { getPaginatedMerchantListData } from '../../../lib/prisma/helpers'

export const PaginatedMerchantListFilters = objectType({
  name: 'PaginatedMerchantListFilters',
  definition(t) {
    t.list.string('country')
    t.list.string('city')
    t.list.string('bank')
  },
})

export const PaginatedMerchantList = objectType({
  name: 'PaginatedMerchantList',
  definition(t) {
    t.int('totalCount')
    t.field('filters', { type: 'PaginatedMerchantListFilters' })
    t.list.field('list', { type: 'Merchant' })
  },
})

export const PaginatedMerchantListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.merchants({ ordering: true, filtering: true })
    t.field('paginatedMerchantList', {
      type: 'PaginatedMerchantList',
      args: {
        take: intArg({ required: true }),
        skip: intArg({ required: true }),
        where: arg({ type: 'MerchantWhereInput' }),
        orderBy: arg({ type: 'MerchantOrderByInput', list: true }),
      },
      async resolve(_root, variables, { prisma }) {
        const paginatedMerchantListData = await getPaginatedMerchantListData(
          variables as PaginatedMerchantListQueryVariables
        )
        return paginatedMerchantListData
      },
    })
  },
})
