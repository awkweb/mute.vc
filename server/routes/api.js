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

router.get('/api/bootstrap', async (req, res) => {
    try {
        const promises = [
            twit.get('account/verify_credentials', {
                include_email: true,
                skip_status: true,
            }),
            twit.get('lists/members', {
                slug: 'mute-vc',
                owner_screen_name: 'tomfme',
                count: 5000,
                include_entities: false,
                skip_status: true,
            }),
            twit.get('mutes/users/ids'),
        ]
        const [
            { data: profileData },
            { data: userData },
            { data: muteData },
        ] = await Promise.all(promises)

        const mutes = muteData ? muteData.ids : []
        const mutesMap = mutes.reduce((result, id) => {
            result[id] = 1
            return result
        }, {})

        const investors = []
        const users = userData ? userData.users : []
        users.forEach((u) => {
            const investor = cleanTwitterUser(u)
            if (investor.username !== req.session.username) {
                investors.push({
                    ...investor,
                    muted: Object.prototype.hasOwnProperty.call(
                        mutesMap,
                        investor.id,
                    ),
                })
            }
        })

        const profile = cleanTwitterUser(profileData)
        await db.users.upsert(req.session.username, profile)

        res.send({
            status: 200,
            data: {
                investors,
                profile,
            },
        })
    } catch (err) {
        console.log(err)
        res.send(err)
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
        res.send({
            status: res.statusCode,
        })
    } catch (err) {
        res.send(err)
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
        res.send({
            status: res.statusCode,
        })
    } catch (err) {
        res.send(err)
    }
})

module.exports = router
