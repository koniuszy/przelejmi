import path from 'path'

import { objectType, queryType, makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'

const Query = queryType({
  definition(t) {
    t.list.field('allScenarios', {
      type: 'Scenario',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.scenario.findMany({})
      },
    })
  },
})

const Scenario = objectType({
  name: 'Scenario',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.paymentType()
    t.model.currency()
    t.model.netPerOne()
    t.model.VAT()
    t.model.totalGross()
    t.model.order()
    t.model.description()
    t.model.amount()
    t.model.unit()
    t.model.notes()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.buyer()
    t.model.buyerId()
    t.model.sellerId()
    t.model.Seller()
  },
})

const schema = makeSchema({
  types: [Query, Scenario],
  //@ts-ignore
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    typegen: path.join(__dirname, 'generated', 'nexus-typegen.ts'),
    schema: path.join(__dirname, 'generated', 'schema.graphql'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: path.join(__dirname, 'src/graphql', 'context.ts'),
        alias: 'Context',
      },
    ],
  },
})

export default schema
