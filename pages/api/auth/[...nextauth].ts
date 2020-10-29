import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next-auth/_utils'

const options = {
    providers: [
        Providers.Twitter({
            clientId: <string>process.env.NEXTAUTH_TWITTER_ID,
            clientSecret: <string>process.env.NEXTAUTH_TWITTER_SECRET,
        }),
    ],
    callbacks: {
        jwt: async (token, user, account, profile, isNewUser) => {
            if (user) {
                token.accessToken = account.accessToken
                token.userId = account.id
                token.username = profile.screen_name
            }
            return Promise.resolve(token)
        },
        session: async (session, token) => {
            session.accessToken = token.accessToken
            session.user.id = token.userId
            session.user.username = token.username
            return Promise.resolve(session)
        },
    },
    session: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
}

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
    NextAuth(req, res, options)
