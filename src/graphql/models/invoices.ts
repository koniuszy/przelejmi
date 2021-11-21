import { extendType, objectType } from 'nexus'

export const Invoice = objectType({
  name: 'Invoice',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.invoiceNumber()
    t.model.issueDate()
    t.model.scenario()
    t.model.scenarioId()
  },
})

export const InvoiceItem = objectType({
  name: 'InvoiceItem',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.quantity()
    t.model.price()
    t.model.scenarioId()
    t.model.vat()
  },
})

export const InvoiceQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.invoice()
    t.crud.invoices()
    t.crud.invoiceItems()
  },
})
