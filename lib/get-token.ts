import { NextApiRequest } from 'next'
import jwt from 'next-auth/jwt'

import { Token } from '@/declarations'

import { IncomingMessage } from 'http'

async function getToken(req: NextApiRequest | IncomingMessage) {
    return <Promise<Token>>jwt.getToken({
        req: <NextApiRequest>req,
        secret: <string>process.env.SECRET,
    })
}

export default getToken
