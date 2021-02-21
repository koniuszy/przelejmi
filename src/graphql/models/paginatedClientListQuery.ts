import { objectType, intArg, arg, extendType } from 'nexus'

export const PaginatedClientsFilters = objectType({
  name: 'PaginatedClientsFilters',
  definition(t) {
    t.list.string('country')
    t.list.string('city')
  },
})

export const PaginatedClients = objectType({
  name: 'PaginatedClients',
  definition(t) {
    t.int('totalCount')
    t.field('filters', { type: 'PaginatedClientsFilters' })
    t.list.field('list', { type: 'Client' })
  },
})

export const PaginatedClientListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.clients({ ordering: true, filtering: true })
    t.field('paginatedClients', {
      type: 'PaginatedClients',
      args: {
        take: intArg({ required: true }),
        skip: intArg({ required: true }),
        where: arg({ type: 'ClientWhereInput' }),
        orderBy: arg({ type: 'ClientOrderByInput', list: true }),
      },
      async resolve(_root, variables, { prisma }) {
        const [totalCount, list, countryList, cityList] = await Promise.all([
          prisma.client.count({ where: variables.where }),
          prisma.client.findMany(variables),
          prisma.client.findMany({
            distinct: 'country',
            select: { country: true },
          }),
          prisma.client.findMany({
            distinct: 'city',
            select: { city: true },
          }),
        ])
        return {
          totalCount,
          list,
          filters: {
            country: countryList.map(({ country }) => country),
            city: cityList.map(({ city }) => city),
          },
        }
      },
    })
  },
})
