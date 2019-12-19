require('dotenv').config()

const express = require('express')
const consola = require('consola')
const session = require('cookie-session')
const { Nuxt, Builder } = require('nuxt')

// Import and Set Nuxt.js options
const LoginWithTwitter = require('login-with-twitter')
const config = require('../nuxt.config.js')
const dev = process.env.NODE_ENV !== 'production'
config.dev = dev
const baseUrl = `http${!dev ? 's' : ''}://${process.env.NUXT_HOST}${
    process.env.NUXT_PORT ? `:${process.env.NUXT_PORT}` : ''
}`

const tw = new LoginWithTwitter({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackUrl: `${baseUrl}/auth/twitter/callback`,
})

// Create a new Express application
const app = express()
app.use(
    session({
        name: 'token',
        secret: process.env.SECRET,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    }),
)

// Define routes
app.get('/auth/twitter', (req, res, next) => {
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

// callback url, must add this to your app on twitters developer portal
app.get('/auth/twitter/callback', (req, res) => {
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
            req.session.userId = user.userId
            req.session.username = user.userName
            req.session.token = user.userToken
            req.session.secret = user.userTokenSecret
            res.redirect('/')
        },
    )
})

app.post('/logout', (req, res) => {
    delete req.session.userId
    delete req.session.username
    delete req.session.token
    delete req.session.secret
    res.redirect('/')
})

// Nuxt start
async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true,
    })
}
start()
