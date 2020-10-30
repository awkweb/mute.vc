import { NextApiResponse } from 'next'

import { ApiRequest, User } from '@/declarations'
import withToken from '@/lib/with-token'
import withTwitter from '@/lib/with-twitter'

const handler = async (req: ApiRequest, res: NextApiResponse<User[]>) => {
    switch (req.method) {
        case 'POST':
            if (req.twitter) {
                try {
                    await req.twitter.createMutes(req.body.screenNames)
                    res.status(200)
                } catch (err) {
                    res.status(429)
                }
            } else {
                res.status(401)
            }
            res.end()
            break

        case 'DELETE':
            if (req.twitter) {
                try {
                    await req.twitter.destroyMutes(req.body.screenNames)
                    res.status(200)
                } catch (err) {
                    res.status(429)
                }
            } else {
                res.status(401)
            }
            res.end()
            break

        default:
            throw new Error(`${req.method} method is not supported`)
    }
}

export default withToken(withTwitter(handler))
