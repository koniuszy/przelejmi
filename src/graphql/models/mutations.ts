import { mutationType } from 'nexus'

export const Mutations = mutationType({
  definition(t) {
    t.crud.createOneScenario()
    t.crud.updateOneScenario()
    t.crud.deleteOneScenario()

    t.crud.createOneClient()
    t.crud.updateOneClient()
    t.crud.deleteOneClient()

    t.crud.createOneMerchant()
    t.crud.deleteOneMerchant()
    t.crud.updateOneMerchant()

    t.crud.createOneInvoice()
  },
})
