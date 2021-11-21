export enum Currency {
  PLN = 'PLN',
  EUR = 'EUR',
}

export enum Unit {
  ITEM = 'item',
  HOURS = 'hours',
}

export enum PaymentType {
  CASH = 'cash',
  TRANSFER = 'transfer',
}

export enum ClientType {
  company = 'Company',
  person = 'Person',
}

export enum DBConditions {
  'includes' = 'in',
  'notIncludes' = 'notIn',

  'lessThan' = 'lt',
  'lessThanOrEqual' = 'lte',
  'graterThan' = 'gt',
  'graterThanOrEqual' = 'gte',

  'equals' = 'equals',
  'contains' = 'contains',
  'startsWith' = 'startsWith',
  'endsWidth' = 'endsWidth',

  'or' = 'OR',
  'and' = 'AND',
  'not' = 'NOT',
}
