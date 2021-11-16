import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { user }) => Boolean(user)
)

export const permissions = shield({
  Query: {
    '*': isAuthenticated,
  },
  Mutation: {
    '*': isAuthenticated,
  },
})
