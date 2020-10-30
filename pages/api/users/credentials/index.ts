import { NextApiResponse } from 'next'

import { ApiRequest, User } from '@/declarations'
import withToken from '@/lib/with-token'
import withTwitter from '@/lib/with-twitter'
import withDatabase from '@/lib/with-database'

const handler = async (req: ApiRequest, res: NextApiResponse<User>) => {
    if (req.method === 'GET') {
        if (req.twitter) {
            const user = await req.twitter.me()
            await req.db
                ?.collection('users')
                .doc(user.screenName)
                .set(user, { merge: true })
            res.status(200).json({ ...user })
        } else {
            res.status(401)
        }
        res.end()
    } else {
        throw new Error(`${req.method} method is not supported`)
    }
}

export default withToken(withTwitter(withDatabase(handler)))
