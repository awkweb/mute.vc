const express = require('express')
const LoginWithTwitter = require('login-with-twitter')

const router = express.Router()

const baseUrl = `${process.env.NUXT_PROTOCOL}://${process.env.NUXT_HOST}${
    process.env.NUXT_PORT ? `:${process.env.NUXT_PORT}` : ''
}`
const tw = new LoginWithTwitter({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackUrl: `${baseUrl}/auth/twitter/callback`,
})

// Define routes
router.get('/auth/twitter', (req, res, next) => {
    tw.login((err, tokenSecret, url) => {
        if (err) {
            console.log(err)
            return next(err)
        }
        req.session.oauthTokenSecret = tokenSecret
        // Redirect to callback URL with query params
        res.redirect(url)
    })
})

// Callback url, must add this to your app on twitters developer portal
router.get('/auth/twitter/callback', (req, res) => {
    tw.callback(
        {
            oauth_token: req.query.oauth_token,
            oauth_verifier: req.query.oauth_verifier,
        },
        req.session.oauthTokenSecret,
        (err, user) => {
            if (err) {
                console.log('failed twitter login', err)
                res.redirect('/')
            }
            delete req.session.oauthTokenSecret
            req.session.admin = user.userId === '106590533'
            req.session.userId = user.userId
            req.session.username = user.userName
            req.session.token = user.userToken
            req.session.secret = user.userTokenSecret
            res.redirect('/')
        },
    )
})

router.post('/logout', (req, res) => {
    delete req.session.admin
    delete req.session.userId
    delete req.session.username
    delete req.session.token
    delete req.session.secret
    res.redirect('/')
})

module.exports = router
