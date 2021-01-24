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
