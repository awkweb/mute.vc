const { Router } = require('express')
const checkAuth = require('../lib/check-auth')
const camelizeUser = require('../lib/camelize-user')

const router = Router()
router.use(checkAuth)

function softFail(promise) {
    return new Promise((resolve) => {
        promise.then(resolve).catch(resolve)
    })
}

router.get('/users', async (req, res) => {
    try {
        const promises = [
            req.twit.get('account/verify_credentials', {
                include_entities: false,
                include_email: true,
                skip_status: true,
            }),
            req.twit.get('lists/members', {
                slug: process.env.TWITTER_LIST_SLUG,
                owner_screen_name: process.env.TWITTER_LIST_OWNER,
                count: 5000,
                include_entities: false,
                skip_status: true,
            }),
            req.twit.get('mutes/users/ids'),
        ]
        const [
            { data: profileData },
            { data: listData },
            mutesRes,
        ] = await Promise.all(promises.map(softFail))

        // Handle mutes rate limit
        let error
        if (mutesRes.statusCode === 429) {
            error = {
                message: 'Twitter rate limit exceeded',
                description: 'Mutes may not show up for 15m.',
            }
        }

        // Get mutes table for lookup
        const { data: mutesData } = mutesRes
        const mutes = mutesData ? mutesData.ids : []
        const mutesMap = {}
        for (let i = 0, n = mutes.length; i < n; ++i) {
            const id = mutes[i]
            mutesMap[id] = 1
        }

        // Create investors list
        const investors = []
        const users = listData ? listData.users : []
        for (let i = 0, n = users.length; i < n; ++i) {
            const user = users[i]
            const investor = camelizeUser(user)
            if (investor.username !== req.user.username) {
                investors.push({
                    ...investor,
                    muted: Object.prototype.hasOwnProperty.call(
                        mutesMap,
                        investor.id,
                    ),
                    on: true,
                })
            }
        }

        const profile = camelizeUser(profileData)
        await req.db
            .collection('users')
            .doc(req.user.username)
            .set(profile, { merge: true })

        res.send({
            status: 200,
            data: {
                investors,
                profile,
                error,
            },
        })
    } catch (err) {
        res.status(err.statusCode || 400).send(err)
    }
})

module.exports = router
