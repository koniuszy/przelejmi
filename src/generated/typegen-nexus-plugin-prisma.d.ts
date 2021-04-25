import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    take?: boolean
    skip?: boolean
    cursor?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime' | 'Json'

// Prisma model type definitions
interface PrismaModels {
  Client: Prisma.Client
  Merchant: Prisma.Merchant
  Scenario: Prisma.Scenario
  Invoice: Prisma.Invoice
  Account: Prisma.Account
  Session: Prisma.Session
  User: Prisma.User
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    clients: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'address' | 'postCode' | 'city' | 'country' | 'VATId' | 'Scenario'
      ordering: 'id' | 'name' | 'address' | 'postCode' | 'city' | 'country' | 'VATId'
    }
    merchants: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'issuerName' | 'companyName' | 'address' | 'postCode' | 'city' | 'country' | 'VATId' | 'email' | 'bankName' | 'bankAccountPln' | 'bankAccountEur' | 'Scenario'
      ordering: 'id' | 'issuerName' | 'companyName' | 'address' | 'postCode' | 'city' | 'country' | 'VATId' | 'email' | 'bankName' | 'bankAccountPln' | 'bankAccountEur'
    }
    scenarios: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'paymentType' | 'imageUrl' | 'netPerOne' | 'VAT' | 'unitType' | 'notes' | 'dueDateDays' | 'createdAt' | 'updatedAt' | 'client' | 'merchant' | 'clientId' | 'merchantId'
      ordering: 'id' | 'name' | 'paymentType' | 'imageUrl' | 'netPerOne' | 'VAT' | 'unitType' | 'notes' | 'dueDateDays' | 'createdAt' | 'updatedAt' | 'clientId' | 'merchantId'
    }
    invoices: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'issueDate' | 'amount' | 'createdAt' | 'updatedAt' | 'content'
      ordering: 'id' | 'issueDate' | 'amount' | 'createdAt' | 'updatedAt' | 'content'
    }
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'compoundId' | 'userId' | 'providerType' | 'providerId' | 'providerAccountId' | 'refreshToken' | 'accessToken' | 'accessTokenExpires' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'compoundId' | 'userId' | 'providerType' | 'providerId' | 'providerAccountId' | 'refreshToken' | 'accessToken' | 'accessTokenExpires' | 'createdAt' | 'updatedAt'
    }
    sessions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'expires' | 'sessionToken' | 'accessToken' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'userId' | 'expires' | 'sessionToken' | 'accessToken' | 'createdAt' | 'updatedAt'
    }
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'createdAt' | 'updatedAt'
    }
  },
  Client: {
    Scenario: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'paymentType' | 'imageUrl' | 'netPerOne' | 'VAT' | 'unitType' | 'notes' | 'dueDateDays' | 'createdAt' | 'updatedAt' | 'client' | 'merchant' | 'clientId' | 'merchantId'
      ordering: 'id' | 'name' | 'paymentType' | 'imageUrl' | 'netPerOne' | 'VAT' | 'unitType' | 'notes' | 'dueDateDays' | 'createdAt' | 'updatedAt' | 'clientId' | 'merchantId'
    }
  }
  Merchant: {
    Scenario: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'paymentType' | 'imageUrl' | 'netPerOne' | 'VAT' | 'unitType' | 'notes' | 'dueDateDays' | 'createdAt' | 'updatedAt' | 'client' | 'merchant' | 'clientId' | 'merchantId'
      ordering: 'id' | 'name' | 'paymentType' | 'imageUrl' | 'netPerOne' | 'VAT' | 'unitType' | 'notes' | 'dueDateDays' | 'createdAt' | 'updatedAt' | 'clientId' | 'merchantId'
    }
  }
  Scenario: {

  }
  Invoice: {

  }
  Account: {

  }
  Session: {

  }
  User: {

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
    invoice: 'Invoice'
    invoices: 'Invoice'
    account: 'Account'
    accounts: 'Account'
    session: 'Session'
    sessions: 'Session'
    user: 'User'
    users: 'User'
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
  },
  Client: {
    id: 'Int'
    name: 'String'
    address: 'String'
    postCode: 'String'
    city: 'String'
    country: 'String'
    VATId: 'String'
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
    VATId: 'String'
    email: 'String'
    bankName: 'String'
    bankAccountPln: 'String'
    bankAccountEur: 'String'
    Scenario: 'Scenario'
  }
  Scenario: {
    id: 'Int'
    name: 'String'
    paymentType: 'String'
    imageUrl: 'String'
    netPerOne: 'Int'
    VAT: 'VAT'
    unitType: 'Unit'
    notes: 'String'
    dueDateDays: 'Int'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    client: 'Client'
    merchant: 'Merchant'
    clientId: 'Int'
    merchantId: 'Int'
  }
  Invoice: {
    id: 'String'
    issueDate: 'DateTime'
    amount: 'Int'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    content: 'Json'
  }
  Account: {
    id: 'Int'
    compoundId: 'String'
    userId: 'Int'
    providerType: 'String'
    providerId: 'String'
    providerAccountId: 'String'
    refreshToken: 'String'
    accessToken: 'String'
    accessTokenExpires: 'DateTime'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Session: {
    id: 'Int'
    userId: 'Int'
    expires: 'DateTime'
    sessionToken: 'String'
    accessToken: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  User: {
    id: 'Int'
    name: 'String'
    email: 'String'
    emailVerified: 'DateTime'
    image: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Client: Typegen.NexusPrismaFields<'Client'>
  Merchant: Typegen.NexusPrismaFields<'Merchant'>
  Scenario: Typegen.NexusPrismaFields<'Scenario'>
  Invoice: Typegen.NexusPrismaFields<'Invoice'>
  Account: Typegen.NexusPrismaFields<'Account'>
  Session: Typegen.NexusPrismaFields<'Session'>
  User: Typegen.NexusPrismaFields<'User'>
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
  