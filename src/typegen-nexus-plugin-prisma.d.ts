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
  Account: Prisma.Account
  Session: Prisma.Session
  User: Prisma.User
  VerificationToken: Prisma.VerificationToken
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
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'type' | 'provider' | 'providerAccountId' | 'refresh_token' | 'access_token' | 'expires_at' | 'token_type' | 'scope' | 'id_token' | 'session_state' | 'oauth_token_secret' | 'oauth_token' | 'user'
      ordering: 'id' | 'userId' | 'type' | 'provider' | 'providerAccountId' | 'refresh_token' | 'access_token' | 'expires_at' | 'token_type' | 'scope' | 'id_token' | 'session_state' | 'oauth_token_secret' | 'oauth_token' | 'user'
    }
    sessions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'sessionToken' | 'userId' | 'expires' | 'user'
      ordering: 'id' | 'sessionToken' | 'userId' | 'expires' | 'user'
    }
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'accounts' | 'sessions'
      ordering: 'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'accounts' | 'sessions'
    }
    verificationTokens: {
      filtering: 'AND' | 'OR' | 'NOT' | 'identifier' | 'token' | 'expires'
      ordering: 'identifier' | 'token' | 'expires'
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
  Account: {

  }
  Session: {

  }
  User: {
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'type' | 'provider' | 'providerAccountId' | 'refresh_token' | 'access_token' | 'expires_at' | 'token_type' | 'scope' | 'id_token' | 'session_state' | 'oauth_token_secret' | 'oauth_token' | 'user'
      ordering: 'id' | 'userId' | 'type' | 'provider' | 'providerAccountId' | 'refresh_token' | 'access_token' | 'expires_at' | 'token_type' | 'scope' | 'id_token' | 'session_state' | 'oauth_token_secret' | 'oauth_token' | 'user'
    }
    sessions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'sessionToken' | 'userId' | 'expires' | 'user'
      ordering: 'id' | 'sessionToken' | 'userId' | 'expires' | 'user'
    }
  }
  VerificationToken: {

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
    account: 'Account'
    accounts: 'Account'
    session: 'Session'
    sessions: 'Session'
    user: 'User'
    users: 'User'
    verificationToken: 'VerificationToken'
    verificationTokens: 'VerificationToken'
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
    createOneAccount: 'Account'
    updateOneAccount: 'Account'
    updateManyAccount: 'AffectedRowsOutput'
    deleteOneAccount: 'Account'
    deleteManyAccount: 'AffectedRowsOutput'
    upsertOneAccount: 'Account'
    createOneSession: 'Session'
    updateOneSession: 'Session'
    updateManySession: 'AffectedRowsOutput'
    deleteOneSession: 'Session'
    deleteManySession: 'AffectedRowsOutput'
    upsertOneSession: 'Session'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'AffectedRowsOutput'
    deleteOneUser: 'User'
    deleteManyUser: 'AffectedRowsOutput'
    upsertOneUser: 'User'
    createOneVerificationToken: 'VerificationToken'
    updateOneVerificationToken: 'VerificationToken'
    updateManyVerificationToken: 'AffectedRowsOutput'
    deleteOneVerificationToken: 'VerificationToken'
    deleteManyVerificationToken: 'AffectedRowsOutput'
    upsertOneVerificationToken: 'VerificationToken'
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
  Account: {
    id: 'String'
    userId: 'String'
    type: 'String'
    provider: 'String'
    providerAccountId: 'String'
    refresh_token: 'String'
    access_token: 'String'
    expires_at: 'Int'
    token_type: 'String'
    scope: 'String'
    id_token: 'String'
    session_state: 'String'
    oauth_token_secret: 'String'
    oauth_token: 'String'
    user: 'User'
  }
  Session: {
    id: 'String'
    sessionToken: 'String'
    userId: 'String'
    expires: 'DateTime'
    user: 'User'
  }
  User: {
    id: 'String'
    name: 'String'
    email: 'String'
    emailVerified: 'DateTime'
    image: 'String'
    accounts: 'Account'
    sessions: 'Session'
  }
  VerificationToken: {
    identifier: 'String'
    token: 'String'
    expires: 'DateTime'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Client: Typegen.NexusPrismaFields<'Client'>
  Merchant: Typegen.NexusPrismaFields<'Merchant'>
  Scenario: Typegen.NexusPrismaFields<'Scenario'>
  InvoiceItem: Typegen.NexusPrismaFields<'InvoiceItem'>
  Invoice: Typegen.NexusPrismaFields<'Invoice'>
  Account: Typegen.NexusPrismaFields<'Account'>
  Session: Typegen.NexusPrismaFields<'Session'>
  User: Typegen.NexusPrismaFields<'User'>
  VerificationToken: Typegen.NexusPrismaFields<'VerificationToken'>
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
  