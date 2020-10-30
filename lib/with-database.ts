import { NextApiHandler, NextApiResponse } from 'next'

import { ApiRequest } from '@/declarations'

import getDatabase from './get-database'

function withDatabase(handler: NextApiHandler) {
    return async (req: ApiRequest, res: NextApiResponse) => {
        req.db = getDatabase()
        return handler(req, res)
    }
}

export default withDatabase
