import { objectType, intArg, arg, extendType } from 'nexus'

import { PaginatedClientListQueryVariables } from 'src/generated/graphql'

import { getPaginatedClientListData } from '../../../lib/prisma/clients'

export const PaginatedClientListFilters = objectType({
  name: 'PaginatedClientListFilters',
  definition(t) {
    t.list.string('country')
    t.list.string('city')
  },
})

export const PaginatedClientList = objectType({
  name: 'PaginatedClientList',
  definition(t) {
    t.int('totalCount')
    t.field('filters', { type: 'PaginatedClientListFilters' })
    t.list.field('list', { type: 'Client' })
  },
})

export const PaginatedClientListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.clients({ ordering: true, filtering: true })
    t.field('paginatedClientList', {
      type: 'PaginatedClientList',
      args: {
        take: intArg({ required: true }),
        skip: intArg({ required: true }),
        where: arg({ type: 'ClientWhereInput', nullable: true }),
        orderBy: arg({ type: 'ClientOrderByInput', list: true, nullable: true }),
      },
      async resolve(_root, variables) {
        const paginatedClientListData = await getPaginatedClientListData(
          variables as PaginatedClientListQueryVariables
        )
        return paginatedClientListData
      },
    })
  },
})
