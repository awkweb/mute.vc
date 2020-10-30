import { NextApiHandler, NextApiResponse } from 'next'

import { ApiRequest } from '@/declarations'

import getToken from './get-token'

function withToken(handler: NextApiHandler) {
    return async (req: ApiRequest, res: NextApiResponse) => {
        const token = await getToken(req)
        req.token = token
        return handler(req, res)
    }
}

export default withToken
