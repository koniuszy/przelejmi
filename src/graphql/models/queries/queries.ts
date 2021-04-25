import { queryType } from 'nexus'

export const ScenarioQuery = queryType({
  definition(t) {
    t.crud.scenarios()
    t.crud.scenario()

    t.crud.client()
    t.crud.merchant()
  },
})