import { NextApiRequest, NextApiResponse } from 'next'
import { Twitter } from 'twit'

import getTwit from '@/lib/get-twit'
import getToken from '@/lib/get-token'
import { User } from '@/declarations'
import cleanTwitterUser from '@/lib/clean-twitter-user'

import { IncomingMessage } from 'http'

export const getUser = async (req: NextApiRequest | IncomingMessage) => {
    const token = await getToken(<NextApiRequest>req)
    if (!token) return

    const twit = getTwit(token.accessToken, token.accessTokenSecret)
    const { data } = await twit.get('account/verify_credentials', {
        include_entities: false,
        include_email: true,
        skip_status: true,
    })
    return cleanTwitterUser(<Twitter.User>data)
}

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
    const user = await getUser(req)
    if (user) res.status(200).json({ ...user })
    else res.status(401)
    res.end()
}

export default handler
