import { NextApiHandler } from 'next'

import { ApolloServer } from 'apollo-server-micro'
import { getToken } from 'next-auth/jwt'

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

const startServer = apolloServer.start()

const handler: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  console.log({ token })
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  if (req.method === 'OPTIONS') {
    res.end()
    return
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export default handler
