import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from 'prisma/prisma-client'

import prisma from 'src/lib/prismaClient'

type NextApi = {
  req: NextApiRequest
  res: NextApiResponse
}

export type Context = {
  prisma: PrismaClient
  db: PrismaClient
}

export async function createContext({ req, res }: NextApi): Promise<Context> {
  return {
    prisma,
    db: prisma,
  }
}
