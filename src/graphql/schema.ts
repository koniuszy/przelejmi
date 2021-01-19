import path from 'path'

import { makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'

import * as types from 'src/graphql/models'

const schema = makeSchema({
  types,
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
