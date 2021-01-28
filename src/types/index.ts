export enum Currency {
  Pln = 'PLN',
  Eur = 'EUR',
}

export enum VAT {
  Standard = '23%',
  Deducted = '8%',
  NotConcerning = 'np',
}

export enum Unit {
  Item = 'ITEM',
  Hours = 'HOURS',
}

export enum PaymentType {
  Cash = 'CASH',
  Transfer = 'TRANSFER',
}

export enum ClientType {
  Company = 'COMPANY',
  Person = 'PERSON',
}

export type OptimizedImg = {
  src: string
  base64: string
  ratio: number
}
