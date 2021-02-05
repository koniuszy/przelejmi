import { objectType } from 'nexus'

export const Client = objectType({
  name: 'Client',
  definition(t) {
    t.model.id()
    t.model.Scenario()
    t.model.address()
    t.model.postCode()
    t.model.city()
    t.model.country()
    t.model.VATId()
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
    t.model.VATId()
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
    t.model.netPerOne()
    t.model.VATId()
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
