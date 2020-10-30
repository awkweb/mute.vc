import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiHandler } from 'next'

import { Session, Token } from '@/declarations'

const options = <InitOptions>{
    providers: [
        Providers.Twitter({
            clientId: <string>process.env.NEXTAUTH_TWITTER_ID,
            clientSecret: <string>process.env.NEXTAUTH_TWITTER_SECRET,
        }),
    ],
    callbacks: {
        jwt: async (token, user, account, profile, _isNewUser) => {
            if (user) {
                token.accessToken = account.accessToken
                token.accessTokenSecret = account.refreshToken
                token.userId = account.id
                token.username = profile.screen_name
            }
            return Promise.resolve(token)
        },
        session: async (session: Session, token: Token) => {
            session.user.id = token.userId
            session.user.username = token.username
            return Promise.resolve(session)
        },
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
    secret: process.env.SECRET,
}

const handler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default handler
