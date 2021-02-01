import { queryType } from 'nexus'

export const ScenarioQuery = queryType({
  definition(t) {
    t.crud.scenarios()
    t.crud.scenario()

    t.crud.client()
    t.crud.clients({ ordering: true })

    t.crud.merchants({ ordering: true, filtering: true })
    t.crud.merchant()
  },
})
