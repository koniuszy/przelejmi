import path from 'path'

import { makeSchema } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'

import * as types from 'src/graphql/models'

const schema = makeSchema({
  types,
  plugins: [
    //@ts-ignore
    nexusSchemaPrisma({
      outputs: { typegen: path.join(__dirname, 'generated', 'typegen-nexus-plugin-prisma.d.ts') },
    }),
  ],
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
