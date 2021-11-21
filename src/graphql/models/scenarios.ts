import { objectType, extendType } from 'nexus'

export const Scenario = objectType({
  name: 'Scenario',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.paymentType()
    t.model.imgUrl()
    t.model.dueDateDays()
    t.model.currency()
    t.model.notes()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.client()
    t.model.clientId()
    t.model.merchantId()
    t.model.merchant()
  },
})

export const ScenarioQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.scenarios()
    t.crud.scenario()
  },
})
