import { objectType, extendType } from 'nexus'

export const MerchantList = objectType({
  name: 'MerchantList',
  definition(t) {
    t.int('totalCount')
    t.list.field('list', { type: 'Merchant' })
  },
})

export const MerchantListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.merchants()
    t.field('merchantList', {
      type: 'MerchantList',
      async resolve(_root, variables, { prisma }) {
        const [totalCount, list] = await Promise.all([
          prisma.merchant.count(),
          prisma.merchant.findMany(),
        ])

        return {
          totalCount,
          list,
        }
      },
    })
  },
})
