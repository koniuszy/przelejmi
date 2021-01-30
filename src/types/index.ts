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

export enum MerchantType {
  COMPANY = 'Company',
  PERSON = 'Person',
}

export type OptimizedImg = {
  src: string
  base64: string
  ratio: number
}

export enum GraphqlTypes {
  'in' = 'in',
  'notIn' = 'notIn',

  'lt' = 'lt',
  'lte' = 'lte',
  'gt' = 'gt',
  'gte' = 'gte',

  'equals' = 'equals',
  'contains' = 'contains',
  'startsWith' = 'startsWith',
  'endsWidth' = 'endsWidth',
}

export type FilterOption = Record<GraphqlTypes.in | GraphqlTypes.notIn, string | string[]>
export type SearchOption = Record<
  GraphqlTypes.contains | GraphqlTypes.equals | GraphqlTypes.startsWith | GraphqlTypes.endsWidth,
  string | string[]
>
