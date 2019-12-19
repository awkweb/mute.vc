// require('dotenv').config()

const express = require('express')
const router = express.Router()

const Twit = require('twit')
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
        req.session.name = data.name
        req.session.email = data.email
        res.send({
            status: data.statusCode,
            data,
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/api/mutes', async (req, res) => {
    try {
        const res = await twit.post('mutes/users/create', {
            screen_name: String(req.body.userId),
        })
        res.send({
            status: res.statusCode,
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
