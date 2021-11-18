import { objectType, extendType } from 'nexus'

function unique(array: string[]) {
  return [...new Set(array)]
}

export const Client = objectType({
  name: 'Client',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.Scenario()
    t.model.address()
    t.model.postCode()
    t.model.city()
    t.model.country()
    t.model.VATId()
  },
})

export const ClientListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.client()
    t.crud.clients({
      pagination: true,
      ordering: true,
      filtering: true,
    })
    t.field('totalClientsCount', {
      type: 'Int',
      async resolve(_root, _variables, { db }) {
        const totalCount = await db.client.count()
        return totalCount
      },
    })
    t.field('clientsFilters', {
      type: ClientListFilters,
      async resolve(_root, _vars, { db }) {
        const distinctList = await db.client.findMany({
          distinct: ['country', 'city', 'postCode'],
          select: { country: true, city: true, postCode: true },
        })

        return {
          country: unique(distinctList.map((i) => i.country)),
          city: unique(distinctList.map((i) => i.city)),
          bank: unique(distinctList.map((i) => i.postCode)),
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
