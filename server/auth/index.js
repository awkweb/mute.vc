const express = require('express')
const session = require('cookie-session')
const parser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days

const app = express()
app.use(parser())
app.use(express.json()) // Handle parsing json data from requests
app.use(
    session({
        name: 'token',
        keys: [process.env.SECRET],
        maxAge,
    }),
)
app.use(passport.initialize())
app.use(passport.session())

const baseUrl = process.env.API_URL
    ? process.env.API_URL
    : `http://${process.env.NUXT_HOST}:${process.env.NUXT_PORT}`

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_KEY,
            consumerSecret: process.env.TWITTER_SECRET,
            callbackURL: `${baseUrl}/auth/callback`,
        },
        (token, tokenSecret, profile, done) => {
            profile.access_token = token
            profile.token_secret = tokenSecret
            return done(null, profile)
        },
    ),
)

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((obj, done) => {
    done(null, obj)
})

app.get('/', passport.authenticate('twitter'))
app.get('/callback', passport.authenticate('twitter'), (req, res) => {
    const { id, username, access_token: token, token_secret: secret } = req.user
    const user = jwt.sign({ id, username, token, secret }, process.env.SECRET, {
        expiresIn: maxAge,
    })
    res.cookie('user', user, { maxAge }).redirect('/')
})

app.post('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.clearCookie('user').redirect('/')
})

module.exports = {
    path: '/auth',
    handler: app,
}
