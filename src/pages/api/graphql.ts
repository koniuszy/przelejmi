import { ApolloServer } from 'apollo-server-micro'

import { createContext } from 'src/graphql/context'
import schema from 'src/graphql/schema'

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
  tracing: process.env.NODE_ENV === 'development',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
