const express = require('express')
const Twit = require('twit')
const db = require('../lib/db')

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
    twit = genTwit(req.session.token, req.session.secret)
    next()
})

router.get('/api/me', async (req, res) => {
    try {
        const { data } = await twit.get('account/verify_credentials', {
            include_email: true,
        })
        await db.upsertUser(req.session.userId, data)
        res.send({
            status: data.statusCode,
            data,
        })
    } catch (err) {
        console.log(err)
    }
})

router.get('/api/investors', async (req, res) => {
    try {
        const data = await db.getInvestors(req.session.username)
        res.send({
            status: res.statusCode,
            data,
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
