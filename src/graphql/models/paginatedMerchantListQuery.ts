import { objectType, intArg, arg, extendType } from 'nexus'

export const PaginatedMerchants = objectType({
  name: 'PaginatedMerchants',
  definition(t) {
    t.int('totalCount')
    t.list.field('list', { type: 'Merchant' })
  },
})

export const PaginatedMerchantListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.merchants({ ordering: true, filtering: true })
    t.field('paginatedMerchants', {
      type: 'PaginatedMerchants',
      args: {
        take: intArg({ required: true }),
        skip: intArg({ required: true }),
        where: arg({ type: 'MerchantWhereInput' }),
        orderBy: arg({ type: 'MerchantOrderByInput', list: true }),
      },
      async resolve(_root, variables, { prisma }) {
        const [totalCount, list] = await Promise.all([
          prisma.merchant.count({ where: variables.where }),
          prisma.merchant.findMany(variables),
        ])
        return { totalCount, list }
      },
    })
  },
})
