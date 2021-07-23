import { ApolloServer } from 'apollo-server-micro'

import { createContext } from 'src/graphql/context'
import schema from 'src/graphql/schema'

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

apolloServer.graphqlPath = 'api/graphql'

export default apolloServer.start().then(() => apolloServer.createHandler())
