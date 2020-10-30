import { NextApiRequest } from 'next'
import jwt from 'next-auth/jwt'

import { Token } from '@/declarations'

async function getToken(req: NextApiRequest) {
    return <Promise<Token>>(
        jwt.getToken({ req, secret: <string>process.env.SECRET })
    )
}

export default getToken
