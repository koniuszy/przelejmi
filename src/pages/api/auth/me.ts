import { NextApiHandler } from 'next'

import { getSession } from '@auth0/nextjs-auth0'

const handler: NextApiHandler = async (req, res) => {
  const session = getSession(req, res)

  if (!session || session.user.ver) {
    res.status(401).end()
    return
  }

  res.json({ token: session.idToken })
}

export default handler
