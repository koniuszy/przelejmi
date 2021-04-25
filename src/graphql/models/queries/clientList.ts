import { objectType, extendType } from 'nexus'

export const ClientList = objectType({
  name: 'ClientList',
  definition(t) {
    t.int('totalCount')
    t.list.field('list', { type: 'Client' })
  },
})

export const ClientListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.clients()
    t.field('clientList', {
      type: 'ClientList',
      async resolve(_root, variables, { prisma }) {
        const [totalCount, list] = await Promise.all([
          prisma.client.count(),
          prisma.client.findMany(),
        ])

        return {
          totalCount,
          list,
        }
      },
    })
  },
})
