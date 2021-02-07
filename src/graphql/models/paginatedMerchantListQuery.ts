import { objectType, intArg, arg, extendType } from 'nexus'

export const PaginatedMerchantsFilters = objectType({
  name: 'PaginatedMerchantFilters',
  definition(t) {
    t.list.string('countryList')
    t.list.string('cityList')
  },
})

export const PaginatedMerchants = objectType({
  name: 'PaginatedMerchants',
  definition(t) {
    t.int('totalCount')
    t.field('filters', { type: 'PaginatedMerchantFilters' })
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
        const [totalCount, list, countryList, cityList] = await Promise.all([
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
        ])

        return {
          totalCount,
          list,
          filters: {
            countryList: countryList.map(({ country }) => country),
            cityList: cityList.map(({ city }) => city),
          },
        }
      },
    })
  },
})
