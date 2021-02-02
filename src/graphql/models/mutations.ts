import { mutationType } from 'nexus'

export const ScenarioMutation = mutationType({
  definition(t) {
    t.crud.createOneScenario()
    t.crud.updateOneScenario()

    t.crud.createOneClient()
    t.crud.updateOneClient()
    t.crud.deleteOneClient()

    t.crud.createOneMerchant()
    t.crud.deleteOneMerchant()
    t.crud.updateOneMerchant()
  },
})
