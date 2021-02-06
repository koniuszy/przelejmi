import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

const g = global as any

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!g.prisma) {
    g.prisma = new PrismaClient()
  }

  prisma = g.prisma
}

export default prisma
