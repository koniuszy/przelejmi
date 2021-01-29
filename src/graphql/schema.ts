import { join } from 'path'

import { makeSchema } from 'nexus'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'

import * as types from 'src/graphql/models'

const schema = makeSchema({
  types,
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      atomicOperations: false,
      paginationStrategy: 'prisma',
    }),
  ],
  outputs: {
    schema: join(process.cwd(), 'src', 'generated', 'schema.graphql'),
    typegen: join(process.cwd(), 'src', 'generated', 'nexus-typegen.ts'),
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
  contextType: {
    module: join(process.cwd(), 'src', 'graphql', 'context.ts'),
    export: 'Context',
  },
})

export default schema
