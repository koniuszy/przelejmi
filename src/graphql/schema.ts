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
  },
})

const schema = makeSchema({
  types: [Query, Scenario],
  //@ts-ignore
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: path.join(process.cwd(), 'graphql', 'context.ts'),
        alias: 'Context',
      },
    ],
  },
})

export default schema
