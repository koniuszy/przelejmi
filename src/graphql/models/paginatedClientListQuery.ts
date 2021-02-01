import { objectType, intArg, arg, extendType } from 'nexus'

export const PaginatedClients = objectType({
  name: 'PaginatedClients',
  definition(t) {
    t.int('totalCount')
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
        const [totalCount, list] = await Promise.all([
          prisma.client.count({ where: variables.where }),
          prisma.client.findMany(variables),
        ])
        return { totalCount, list }
      },
    })
  },
})
