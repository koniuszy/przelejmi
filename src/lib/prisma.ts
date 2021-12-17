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

// prisma.$use(async (params, next) => {
//   const before = Date.now()
//   const result = await next(params)
//   const after = Date.now()

//   console.info(`Query ${params.model}.${params.action} took ${after - before}ms`)

//   return result
// })

// prisma.$on('query', (e) => {
//   console.log({ e })
//   console.log('Query: ' + e.query)
//   console.log('Duration: ' + e.duration + 'ms')
// })

export default prisma
