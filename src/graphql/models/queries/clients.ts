import { objectType, extendType } from 'nexus'

function unique(array: string[]) {
  return [...new Set(array)]
}

export const ClientListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.clients({
      pagination: true,
      ordering: true,
      filtering: true,
    })
    t.field('totalClientsCount', {
      type: 'Int',
      async resolve(_root, _variables, { db }) {
        const totalCount = await db.merchant.count()
        return totalCount
      },
    })
    t.field('clientsFilters', {
      type: ClientListFilters,
      async resolve(_root, _vars, { db }) {
        const distinctList = await db.merchant.findMany({
          distinct: ['country', 'city', 'bankName'],
          select: { country: true, city: true, bankName: true },
        })

        return {
          country: unique(distinctList.map((i) => i.country)),
          city: unique(distinctList.map((i) => i.city)),
          bank: unique(distinctList.map((i) => i.bankName)),
        }
      },
    })
  },
})

const ClientListFilters = objectType({
  name: 'ClientListFilters',
  definition(t) {
    t.list.string('country')
    t.list.string('city')
    t.list.string('bank')
  },
})
