import { NextApiHandler } from 'next'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import prisma from 'src/lib/prisma'

const WHITE_LIST = [
  'michal.stefan.konczak@gmail.com',
  'ms.magdalena.kozlowska@gmail.com',
  'bogusz.konczak@gmail.com',
]

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) throw new Error('missing JWT_SECRET env')

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    session: {
      jwt: true,
      maxAge: 4 * 30 * 24 * 60 * 60, // 4 * 30 days
    },
    jwt: {
      secret: JWT_SECRET,
    },
    providers: [
      EmailProvider({
        server: process.env.EMAIL_SERVER,
      }),
    ],
    callbacks: {
      async session({ session }) {
        if (session.user) {
          session.user.image =
            'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/06/Itachi-Cropped.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5'
        }

        return session
      },
      async signIn({ user, profile }) {
        console.log({ user, profile })

        return WHITE_LIST.includes(user.email || '')
      },
    },
  })
export default authHandler
