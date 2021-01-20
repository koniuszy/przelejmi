import path from 'path'

import { makeSchema } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'

import * as types from 'src/graphql/models'

const schema = makeSchema({
  types,
  plugins: [
    //@ts-ignore
    nexusSchemaPrisma({
      experimentalCRUD: true,
      paginationStrategy: 'prisma',
    }),
  ],
  outputs: {
    typegen: path.join(process.cwd(), 'src', 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'src', 'generated', 'schema.graphql'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: path.join(process.cwd(), 'src', 'graphql', 'context.ts'),
        alias: 'Context',
      },
    ],
  },
})

export default schema
