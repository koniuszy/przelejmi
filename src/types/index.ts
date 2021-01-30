export enum Currency {
  PLN = 'PLN',
  EUR = 'EUR',
}

export enum VAT {
  '23%' = '23%',
  '8%' = '8%',
  np = 'np',
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
  COMPANY = 'Company',
  PERSON = 'Person',
}

export type OptimizedImg = {
  src: string
  base64: string
  ratio: number
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

export type FilterOption = Record<
  DBConditions.includes | DBConditions.notIncludes,
  string | string[]
>
export type SearchOption = Record<
  DBConditions.contains | DBConditions.equals | DBConditions.startsWith | DBConditions.endsWidth,
  string | string[]
>
