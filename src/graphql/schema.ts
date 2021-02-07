import { join } from 'path'

import { applyMiddleware } from 'graphql-middleware'
import { makeSchema, declarativeWrappingPlugin } from 'nexus'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'

import * as types from './models'
import { permissions } from './shield'

const baseSchema = makeSchema({
  types,
  plugins: [
    declarativeWrappingPlugin(),
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
        module: 'prisma/prisma-client',
        alias: 'prisma',
      },
    ],
  },
  contextType: {
    module: join(process.cwd(), 'src', 'graphql', 'context.ts'),
    export: 'Context',
  },
})

export const schema = applyMiddleware(baseSchema, permissions)

export default schema
