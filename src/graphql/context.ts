import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

type NextApi = {
  req: NextApiRequest
  res: NextApiResponse
}

const prisma = new PrismaClient()

export type Context = {
  prisma: PrismaClient
}

export async function createContext({ req, res }: NextApi): Promise<Context> {
  return {
    prisma,
  }
}
