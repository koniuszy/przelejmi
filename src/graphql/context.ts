import { NextApiRequest, NextApiResponse } from 'next'

import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { PrismaClient } from 'prisma/prisma-client'

import prisma from 'src/lib/prisma'

type NextApi = {
  req: NextApiRequest
  res: NextApiResponse
}

export type Context = {
  prisma: PrismaClient
  db: PrismaClient
  user: Session['user'] | null
}

export async function createContext({ req }: NextApi): Promise<Context> {
  const session = await getSession({ req })

  return {
    prisma,
    db: prisma,
    user: session?.user || null,
  }
}
