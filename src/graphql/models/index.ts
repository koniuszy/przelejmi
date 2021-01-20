import { mutationType, objectType, queryType } from '@nexus/schema'

export const Buyer = objectType({
  name: 'Buyer',
  definition(t) {
    t.model.id()
    t.model.Scenario()
    t.model.address()
    t.model.postAddress()
    t.model.nip()
    t.model.name()
  },
})

export const Seller = objectType({
  name: 'Seller',
  definition(t) {
    t.model.id()
    t.model.Scenario()
    t.model.address()
    t.model.postAddress()
    t.model.nip()
    t.model.name()
    t.model.email()
    t.model.bankAccount()
    t.model.bankName()
  },
})

export const ScenarioQuery = queryType({
  definition(t) {
    t.crud.scenarios()
    t.crud.scenario()
  },
})

export const ScenarioMutation = mutationType({
  definition(t) {
    t.crud.createOneScenario()
    t.crud.updateOneScenario()
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
    t.model.totalGross()
    t.model.order()
    t.model.description()
    t.model.amount()
    t.model.unit()
    t.model.notes()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.buyer()
    t.model.buyerId()
    t.model.sellerId()
    t.model.seller()
  },
})
