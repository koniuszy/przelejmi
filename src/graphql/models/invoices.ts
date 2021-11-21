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
    t.model.items()
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
    t.crud.invoices({
      pagination: true,
      ordering: true,
      filtering: true,
    })
    t.crud.invoiceItems()
    t.field('totalInvoicesCount', {
      type: 'Int',
      resolve(_root, _variables, { db }) {
        return db.invoice.count()
      },
    })
    t.field('invoiceFilters', {
      type: PaginatedInvoiceListFilters,
      async resolve(_root, _vars, { db }) {
        const distinctList = await db.invoice.findMany({
          distinct: ['scenarioId'],
          select: { scenario: { select: { id: true, name: true } } },
        })

        return {
          scenario: distinctList.map((i) => i.scenario),
        }
      },
    })
  },
})

const ScenarioFilterType = objectType({
  name: 'ScenarioFilterType',
  definition(t) {
    t.int('id')
    t.string('name')
  },
})

const PaginatedInvoiceListFilters = objectType({
  name: 'PaginatedInvoiceListFilters',
  definition(t) {
    t.field('scenario', { type: ScenarioFilterType, list: true })
  },
})
