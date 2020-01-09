const express = require('express')
const Twit = require('twit')
const db = require('../lib/db')
const cleanTwitterUser = require('../lib/clean-twitter-user')

const router = express.Router()

function genTwit(token, secret) {
    return new Twit({
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET,
        access_token: token,
        access_token_secret: secret,
    })
}

let twit

router.use('/api', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    if (!req.session.username) {
        res.sendStatus(403)
        return
    }
    twit = genTwit(req.session.token, req.session.secret)
    next()
})

function softFail(promise) {
    return new Promise((resolve) => {
        promise.then(resolve).catch(resolve)
    })
}

router.get('/api/bootstrap', async (req, res) => {
    try {
        const promises = [
            twit.get('account/verify_credentials', {
                include_email: true,
                skip_status: true,
            }),
            twit.get('lists/members', {
                slug: process.env.TWITTER_LIST_SLUG,
                owner_screen_name: process.env.TWITTER_LIST_OWNER,
                count: 5000,
                include_entities: false,
                skip_status: true,
            }),
            twit.get('mutes/users/ids'),
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
            const investor = cleanTwitterUser(user)
            if (investor.username !== req.session.username) {
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

        const profile = cleanTwitterUser(profileData)
        await db.users.upsert(req.session.username, profile)

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

router.post('/api/mutes/create', async (req, res) => {
    try {
        const { usernames } = req.body
        const promises = usernames.map((u) =>
            twit.post('mutes/users/create', {
                screen_name: u,
            }),
        )
        await Promise.all(promises)
        res.send({ status: 200 })
    } catch (err) {
        let error = err
        if (err.statusCode === 429) {
            error = {
                message: 'Twitter rate limit exceeded',
                description: 'Mute failed. Try again in a few minutes.',
            }
        }
        res.status(error.statusCode || 400).send(error)
    }
})

router.post('/api/mutes/destroy', async (req, res) => {
    try {
        const { usernames } = req.body
        const promises = usernames.map((u) =>
            twit.post('mutes/users/destroy', {
                screen_name: u,
            }),
        )
        await Promise.all(promises)
        res.send({ status: 200 })
    } catch (err) {
        let error = err
        if (err.statusCode === 429) {
            error = {
                message: 'Twitter rate limit exceeded',
                description: 'Unmute failed. Try again in a few minutes.',
            }
        }
        res.status(error.statusCode || 400).send(error)
    }
})

module.exports = router
