import { NextApiRequest, NextApiResponse } from 'next'

import { getSession, Session } from 'next-auth/client'
import { PrismaClient } from 'prisma/prisma-client'

import prisma from 'src/lib/prismaClient'

type NextApi = {
  req: NextApiRequest
  res: NextApiResponse
}

export type Context = {
  prisma: PrismaClient
  db: PrismaClient
  user: Session['user']
}

export async function createContext({ req, res }: NextApi): Promise<Context> {
  const session = await getSession({ req })

  return {
    prisma,
    db: prisma,
    user: session.user,
  }
}
