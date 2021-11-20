import { objectType, extendType } from 'nexus'

function unique(array: string[]) {
  return [...new Set(array)]
}

export const Merchant = objectType({
  name: 'Merchant',
  definition(t) {
    t.model.id()
    t.model.Scenario()
    t.model.address()
    t.model.postCode()
    t.model.city()
    t.model.country()
    t.model.VATId()
    t.model.companyName()
    t.model.email()
    t.model.bankAccountPln()
    t.model.bankAccountEur()
    t.model.bankName()
    t.model.issuerName()
  },
})

export const MerchantListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.merchant()
    t.crud.merchants({
      pagination: true,
      ordering: true,
      filtering: true,
    })
    t.field('totalMerchantsCount', {
      type: 'Int',
      async resolve(_root, _variables, { db }) {
        const totalCount = await db.merchant.count()
        return totalCount
      },
    })
    t.field('merchantsFilters', {
      type: PaginatedMerchantListFilters,
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

const PaginatedMerchantListFilters = objectType({
  name: 'PaginatedMerchantListFilters',
  definition(t) {
    t.list.string('country')
    t.list.string('city')
    t.list.string('bank')
  },
})