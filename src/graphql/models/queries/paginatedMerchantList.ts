import { objectType, intArg, arg, extendType } from 'nexus'

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
        const [totalCount, list, countryList, cityList, bankList] = await Promise.all([
          prisma.merchant.count({ where: variables.where }),
          prisma.merchant.findMany(variables),
          prisma.merchant.findMany({
            distinct: 'country',
            select: { country: true },
          }),
          prisma.merchant.findMany({
            distinct: 'city',
            select: { city: true },
          }),
          prisma.merchant.findMany({ distinct: 'bankName', select: { bankName: true } }),
        ])

        return {
          totalCount,
          list,
          filters: {
            country: countryList.map(({ country }) => country),
            city: cityList.map(({ city }) => city),
            bank: bankList.map(({ bankName }) => bankName),
          },
        }
      },
    })
  },
})