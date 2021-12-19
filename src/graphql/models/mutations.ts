import { mutationType } from 'nexus'

export const Mutations = mutationType({
  definition(t) {
    t.crud.createOneScenario()
    t.crud.updateOneScenario()
    t.crud.deleteOneScenario()

    t.crud.createOneInvoice()
    t.crud.updateOneInvoice()
    t.crud.deleteOneInvoice()
  },
})
