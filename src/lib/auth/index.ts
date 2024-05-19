import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Lucia, Session, User } from 'lucia'
import prisma from '../db'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { Discord } from 'arctic'
import poster from '@sern/poster'
import { RESTGetAPIUserResult } from 'discord-api-types/v10'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      isAdmin: attributes.isAdmin,
      discord_id: attributes.discord_id,
    }
  },
})

export const discord = new Discord(process.env.DSC_CLIENTID!, process.env.DSC_CLIENTSECRET!, process.env.NODE_ENV === 'production' ? process.env.DSC_REDIRECTURI! : 'http://localhost:3000/auth/login/discord/callback')

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

  if (!sessionId)
    return {
      user: null,
      session: null,
      discord: null,
    }

  let discord = null
  const { user, session } = await lucia.validateSession(sessionId)
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (session) {
      const initDiscord = await poster.client(process.env.DSC_TOKEN!)
      discord = (await (
        await initDiscord('user/get', {
          user_id: user!.discord_id,
        })
      ).json()) as RESTGetAPIUserResult
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch {
    // Next.js throws error attempting to set cookies when rendering page
  }

  return {
    user,
    session,
    discord,
  }
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  username: string
  isAdmin: boolean
  discord_id: string
}
