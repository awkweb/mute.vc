import { NextApiResponse } from 'next'

import { ApiError, ApiRequest, User } from '@/declarations'
import withToken from '@/lib/with-token'
import withTwitter from '@/lib/with-twitter'

const handler = async (
    req: ApiRequest,
    res: NextApiResponse<User[] | ApiError>,
) => {
    if (req.method === 'GET') {
        if (req.twitter) {
            try {
                const mutes = await req.twitter.getMutes()
                res.status(200).json({ ...mutes })
            } catch (err) {
                const message =
                    err.statusCode === 429
                        ? 'Twitter rate limit exceeded'
                        : 'Something went wrong'
                res.status(err.statusCode).json({ message })
            }
        } else {
            res.status(401)
        }
        res.end()
    } else {
        throw new Error(`${req.method} method is not supported`)
    }
}

export default withToken(withTwitter(handler))
