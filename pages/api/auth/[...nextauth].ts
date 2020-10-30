import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiHandler } from 'next'

const options = <InitOptions>{
    providers: [
        Providers.Twitter({
            clientId: <string>process.env.NEXTAUTH_TWITTER_ID,
            clientSecret: <string>process.env.NEXTAUTH_TWITTER_SECRET,
        }),
    ],
    callbacks: {
        jwt: async (token, user, account, _profile, _isNewUser) => {
            if (user) {
                token.accessToken = account.accessToken
                token.accessTokenSecret = account.refreshToken
            }
            return Promise.resolve(token)
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
