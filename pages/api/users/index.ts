import { NextApiResponse } from 'next'

import { ApiRequest, User } from '@/declarations'
import withToken from '@/lib/with-token'
import withTwitter from '@/lib/with-twitter'

const handler = async (req: ApiRequest, res: NextApiResponse<User[]>) => {
    if (req.method === 'GET') {
        if (req.twitter) {
            const users = await req.twitter.getUsers()
            res.status(200).json({ ...users })
        } else {
            res.status(401)
        }
        res.end()
    } else {
        throw new Error(`${req.method} method is not supported`)
    }
}

export default withToken(withTwitter(handler))
