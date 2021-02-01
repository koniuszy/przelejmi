import { mutationType, objectType, queryType, intArg, arg, extendType } from 'nexus'

export const Client = objectType({
  name: 'Client',
  definition(t) {
    t.model.id()
    t.model.Scenario()
    t.model.address()
    t.model.postCode()
    t.model.city()
    t.model.country()
    t.model.nip()
    t.model.name()
  },
})

export const Merchant = objectType({
  name: 'Merchant',
  definition(t) {
    t.model.id()
    t.model.Scenario()
    t.model.address()
    t.model.postCode()
    t.model.city()
    t.model.country()
    t.model.nip()
    t.model.companyName()
    t.model.email()
    t.model.bankAccountPln()
    t.model.bankAccountEur()
    t.model.bankName()
    t.model.issuerName()
  },
})

export const Scenario = objectType({
  name: 'Scenario',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.paymentType()
    t.model.currency()
    t.model.netPerOne()
    t.model.VAT()
    t.model.order()
    t.model.description()
    t.model.amount()
    t.model.unit()
    t.model.notes()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.client()
    t.model.clientId()
    t.model.merchantId()
    t.model.merchant()
  },
})

export const PaginatedClients = objectType({
  name: 'PaginatedClients',
  definition(t) {
    t.int('totalCount')
    t.list.field('list', { type: 'Client' })
  },
})

export const ScenarioQuery = queryType({
  definition(t) {
    t.crud.scenarios()
    t.crud.scenario()

    t.crud.client()

    t.crud.merchants({ ordering: true, filtering: true })
    t.crud.merchant()
  },
})

export const PaginatedClientListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('paginatedClients', {
      type: 'PaginatedClients',
      args: {
        take: intArg({ required: true }),
        skip: intArg({ required: true }),
        where: arg({ type: 'ClientWhereInput' }),
        orderBy: arg({ type: 'ClientOrderByInput', list: true }),
      },
      async resolve(_root, variables, { prisma }) {
        const [totalCount, clientList] = await Promise.all([
          prisma.client.count(variables),
          prisma.client.findMany(variables),
        ])
        return { totalCount, clientList }
      },
    })
  },
})

export const ScenarioMutation = mutationType({
  definition(t) {
    t.crud.createOneScenario()
    t.crud.updateOneScenario()

    t.crud.createOneClient()
    t.crud.updateOneClient()
    t.crud.deleteOneClient()

    t.crud.createOneMerchant()
  },
})
