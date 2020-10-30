import { NextApiHandler, NextApiResponse } from 'next'

import { ApiRequest } from '@/declarations'

import Twitter from './twitter'

function withTwitter(handler: NextApiHandler) {
    return async (req: ApiRequest, res: NextApiResponse) => {
        if (req.token) {
            req.twitter = new Twitter(req.token)
        } else {
            throw new Error('`withTwitter` requires a token')
        }
        return handler(req, res)
    }
}

export default withTwitter
