export type ClientType = 'Company' | 'Person'

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
