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

router.get('/api/me', async (req, res) => {
    try {
        console.log('hi')
        const { data } = await twit.get('account/verify_credentials', {
            include_email: true,
        })
        const cleaned = cleanTwitterUser(data)
        await db.users.upsert(req.session.username, cleaned)
        res.send({
            status: data.statusCode,
            data: cleaned,
        })
    } catch (err) {
        res.send(err)
    }
})

router.get('/api/investors', async (req, res) => {
    try {
        const data = await db.investors.list(req.session.username)
        res.send({
            status: res.statusCode,
            data,
        })
    } catch (err) {
        res.send(err)
    }
})

router.post('/api/investors', async (req, res) => {
    try {
        const { usernames } = req.body
        const promises = usernames.map((u) =>
            twit.get('users/show', {
                screen_name: u,
                include_entities: false,
            }),
        )
        const all = await Promise.all(promises)
        const data = []
        all.forEach((value) => {
            const { data: investorData } = value
            const cleaned = cleanTwitterUser(investorData)
            data.push(cleaned)
            db.investors.upsert(cleaned.username, cleaned)
        })
        res.send({
            status: res.statusCode,
            data,
        })
    } catch (err) {
        res.send(err)
    }
})

router.post('/api/mutes', async (req, res) => {
    try {
        const { usernames } = req.body
        const promises = usernames.map((u) =>
            twit.post('mutes/users/create', {
                screen_name: u,
            }),
        )
        await Promise.all(promises)
        await db.investors.incrementMutes(usernames)
        res.send({
            status: res.statusCode,
        })
    } catch (err) {
        res.send(err)
    }
})

module.exports = router
