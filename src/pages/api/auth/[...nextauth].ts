import { NextApiHandler } from 'next'

import NextAuth from 'next-auth'
import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'

import prisma from 'src/lib/prisma/prismaClient'

const whiteList = [
  'michal.stefan.konczak@gmail.com',
  'ms.magdalena.kozlowska@gmail.com',
  'bogusz.konczak@gmail.com',
]

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    adapter: Adapters.Prisma.Adapter({ prisma }),
    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
    callbacks: {
      async signIn(user, account, profile) {
        return profile.verified_email && whiteList.includes(profile.email)
      },
    },
  })
export default authHandler
