import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@models/userModel'
import bcrypt from 'bcryptjs'
import { connectToDB } from '@utils/database'
import { NextResponse } from 'next/server'

export const authOptions = {
  providers: [
    CredentialsProvider({
      secret: process.env.NEXTAUTH_SECRET,
      async authorize(credentials, req) {
        connectToDB()
        const { email, password } = credentials

        const user = await User.findOne({ email }).select('+password')
        if (!user) {
          throw new Error('Invalid Email or Password')
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password')
        }
        return user
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }

      if (user) {
        token.user = user
        token.role = user.role
      }
      console.log('userId', user)
      // user && (token.role = user.role)

      return { ...token, ...user }
    },
    session: async ({ session, token }) => {
      if (session.user) {
        // console.log('Session from backend', session)
        // console.log('Token from backend', JSON.stringify(token, null, 2))
        let user = session.user
        session.user = {
          name: token?.name || token.user?.name,
          email: token?.email || token.user?.email,
          phone: token?.phone || token.user?.phone,
          role: token?.role || token.user?.role,
          title: token?.title || token.user?.title,
          description: token?.description || token.user?.desription,
          avatar: token?.avatar || token.user?.avatar,
          _id: token?._id || token?.user?._id,
          createdAt: token?.createdAt || token?.user?.createdAt,
          updatedAt: token?.updatedAt || token?.user?.updatedAt,
        }
        // session.user = token.user
        // session.user.role = token.role

        delete session?.user?.password
        // delete password from session
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
