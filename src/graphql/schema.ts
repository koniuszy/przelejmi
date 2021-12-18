import { join } from 'path'

// eslint-disable-next-line import/no-extraneous-dependencies
import { ForbiddenError } from 'apollo-server-errors'
import { makeSchema, declarativeWrappingPlugin } from 'nexus'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { nexusShield, ruleType } from 'nexus-shield'

import * as types from './models'

const isAuthenticated = ruleType({
  resolve: (root, args, ctx) => {
    // if (process.env.NODE_ENV === 'development') return true

    const allowed = Boolean(ctx.user)
    if (!allowed) throw new ForbiddenError('Not allowed')
    return allowed
  },
})

const baseSchema = makeSchema({
  types,
  shouldGenerateArtifacts: true,
  nonNullDefaults: {
    input: false,
    output: true,
  },
  prettierConfig: join(process.cwd(), '.prettierrc'),
  plugins: [
    nexusShield({
      defaultError: new ForbiddenError('Not allowed'),
      defaultRule: isAuthenticated,
    }),
    declarativeWrappingPlugin(),
    nexusSchemaPrisma({
      experimentalCRUD: true,
      atomicOperations: false,
      paginationStrategy: 'prisma',
      // lambda bug does not allow to create those on build time
      shouldGenerateArtifacts: process.env.NODE_ENV !== 'production',
      outputs: {
        typegen: join(process.cwd(), 'src', 'typegen-nexus-plugin-prisma.d.ts'),
      },
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

export default baseSchema
