import { mutationType } from 'nexus'

export const ScenarioMutation = mutationType({
  definition(t) {
    t.crud.createOneScenario()
    t.crud.updateOneScenario()
    t.crud.deleteOneScenario()

    t.crud.createOneClient()
    t.crud.updateOneClient()
    t.crud.deleteOneClient()

    t.crud.createOneMerchant()
    t.crud.deleteOneMerchant({
      async resolve(root, vars, ctx, info, originalResolver) {
        const results = await originalResolver(root, vars, ctx, info)

        return results
      },
    })
    t.crud.updateOneMerchant()
  },
})
