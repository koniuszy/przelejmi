import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    take?: boolean
    skip?: boolean
    cursor?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  Client: Prisma.Client
  Merchant: Prisma.Merchant
  Scenario: Prisma.Scenario
  InvoiceItem: Prisma.InvoiceItem
  Invoice: Prisma.Invoice
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    clients: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'address' | 'postCode' | 'city' | 'country' | 'vatId' | 'Scenario'
      ordering: 'id' | 'name' | 'address' | 'postCode' | 'city' | 'country' | 'vatId' | 'Scenario'
    }
    merchants: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'issuerName' | 'companyName' | 'address' | 'postCode' | 'city' | 'country' | 'vatId' | 'email' | 'bankName' | 'bankAccountPln' | 'bankAccountEur' | 'Scenario'
      ordering: 'id' | 'issuerName' | 'companyName' | 'address' | 'postCode' | 'city' | 'country' | 'vatId' | 'email' | 'bankName' | 'bankAccountPln' | 'bankAccountEur' | 'Scenario'
    }
    scenarios: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'imgUrl' | 'notes' | 'dueDateDays' | 'paymentType' | 'currency' | 'createdAt' | 'updatedAt' | 'client' | 'merchant' | 'clientId' | 'merchantId' | 'Invoice'
      ordering: 'id' | 'name' | 'imgUrl' | 'notes' | 'dueDateDays' | 'paymentType' | 'currency' | 'createdAt' | 'updatedAt' | 'client' | 'merchant' | 'clientId' | 'merchantId' | 'Invoice'
    }
    invoiceItems: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'quantity' | 'price' | 'vat' | 'scenarioId' | 'invoice' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'name' | 'quantity' | 'price' | 'vat' | 'scenarioId' | 'invoice' | 'createdAt' | 'updatedAt'
    }
    invoices: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'invoiceNumber' | 'issueDate' | 'items' | 'scenarioId' | 'scenario' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'invoiceNumber' | 'issueDate' | 'items' | 'scenarioId' | 'scenario' | 'createdAt' | 'updatedAt'
    }
  },
  Client: {
    Scenario: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'imgUrl' | 'notes' | 'dueDateDays' | 'paymentType' | 'currency' | 'createdAt' | 'updatedAt' | 'client' | 'merchant' | 'clientId' | 'merchantId' | 'Invoice'
      ordering: 'id' | 'name' | 'imgUrl' | 'notes' | 'dueDateDays' | 'paymentType' | 'currency' | 'createdAt' | 'updatedAt' | 'client' | 'merchant' | 'clientId' | 'merchantId' | 'Invoice'
    }
  }
  Merchant: {
    Scenario: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'imgUrl' | 'notes' | 'dueDateDays' | 'paymentType' | 'currency' | 'createdAt' | 'updatedAt' | 'client' | 'merchant' | 'clientId' | 'merchantId' | 'Invoice'
      ordering: 'id' | 'name' | 'imgUrl' | 'notes' | 'dueDateDays' | 'paymentType' | 'currency' | 'createdAt' | 'updatedAt' | 'client' | 'merchant' | 'clientId' | 'merchantId' | 'Invoice'
    }
  }
  Scenario: {
    Invoice: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'invoiceNumber' | 'issueDate' | 'items' | 'scenarioId' | 'scenario' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'invoiceNumber' | 'issueDate' | 'items' | 'scenarioId' | 'scenario' | 'createdAt' | 'updatedAt'
    }
  }
  InvoiceItem: {

  }
  Invoice: {
    items: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'quantity' | 'price' | 'vat' | 'scenarioId' | 'invoice' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'name' | 'quantity' | 'price' | 'vat' | 'scenarioId' | 'invoice' | 'createdAt' | 'updatedAt'
    }
  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    client: 'Client'
    clients: 'Client'
    merchant: 'Merchant'
    merchants: 'Merchant'
    scenario: 'Scenario'
    scenarios: 'Scenario'
    invoiceItem: 'InvoiceItem'
    invoiceItems: 'InvoiceItem'
    invoice: 'Invoice'
    invoices: 'Invoice'
  },
  Mutation: {
    createOneClient: 'Client'
    updateOneClient: 'Client'
    updateManyClient: 'AffectedRowsOutput'
    deleteOneClient: 'Client'
    deleteManyClient: 'AffectedRowsOutput'
    upsertOneClient: 'Client'
    createOneMerchant: 'Merchant'
    updateOneMerchant: 'Merchant'
    updateManyMerchant: 'AffectedRowsOutput'
    deleteOneMerchant: 'Merchant'
    deleteManyMerchant: 'AffectedRowsOutput'
    upsertOneMerchant: 'Merchant'
    createOneScenario: 'Scenario'
    updateOneScenario: 'Scenario'
    updateManyScenario: 'AffectedRowsOutput'
    deleteOneScenario: 'Scenario'
    deleteManyScenario: 'AffectedRowsOutput'
    upsertOneScenario: 'Scenario'
    createOneInvoiceItem: 'InvoiceItem'
    updateOneInvoiceItem: 'InvoiceItem'
    updateManyInvoiceItem: 'AffectedRowsOutput'
    deleteOneInvoiceItem: 'InvoiceItem'
    deleteManyInvoiceItem: 'AffectedRowsOutput'
    upsertOneInvoiceItem: 'InvoiceItem'
    createOneInvoice: 'Invoice'
    updateOneInvoice: 'Invoice'
    updateManyInvoice: 'AffectedRowsOutput'
    deleteOneInvoice: 'Invoice'
    deleteManyInvoice: 'AffectedRowsOutput'
    upsertOneInvoice: 'Invoice'
  },
  Client: {
    id: 'Int'
    name: 'String'
    address: 'String'
    postCode: 'String'
    city: 'String'
    country: 'String'
    vatId: 'String'
    Scenario: 'Scenario'
  }
  Merchant: {
    id: 'Int'
    issuerName: 'String'
    companyName: 'String'
    address: 'String'
    postCode: 'String'
    city: 'String'
    country: 'String'
    vatId: 'String'
    email: 'String'
    bankName: 'String'
    bankAccountPln: 'String'
    bankAccountEur: 'String'
    Scenario: 'Scenario'
  }
  Scenario: {
    id: 'Int'
    name: 'String'
    imgUrl: 'String'
    notes: 'String'
    dueDateDays: 'Int'
    paymentType: 'PaymentType'
    currency: 'Currency'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    client: 'Client'
    merchant: 'Merchant'
    clientId: 'Int'
    merchantId: 'Int'
    Invoice: 'Invoice'
  }
  InvoiceItem: {
    id: 'Int'
    name: 'String'
    quantity: 'Int'
    price: 'Int'
    vat: 'Vat'
    scenarioId: 'Int'
    invoice: 'Invoice'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Invoice: {
    id: 'Int'
    invoiceNumber: 'String'
    issueDate: 'String'
    items: 'InvoiceItem'
    scenarioId: 'Int'
    scenario: 'Scenario'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Client: Typegen.NexusPrismaFields<'Client'>
  Merchant: Typegen.NexusPrismaFields<'Merchant'>
  Scenario: Typegen.NexusPrismaFields<'Scenario'>
  InvoiceItem: Typegen.NexusPrismaFields<'InvoiceItem'>
  Invoice: Typegen.NexusPrismaFields<'Invoice'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  