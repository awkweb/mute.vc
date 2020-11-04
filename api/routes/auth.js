const { Router } = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days

const router = Router()
router.use(passport.initialize())
router.use(passport.session())

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_KEY,
            consumerSecret: process.env.TWITTER_SECRET,
            callbackURL: `${process.env.URL}/api/auth/callback`,
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

router.get('/auth', passport.authenticate('twitter'))
router.get('/auth/callback', passport.authenticate('twitter'), (req, res) => {
    const { id, username, access_token: token, token_secret: secret } = req.user
    const user = jwt.sign({ id, username, token, secret }, process.env.SECRET, {
        expiresIn: maxAge,
    })
    res.cookie('user', user, { maxAge }).redirect('/')
})

router.post('/auth/logout', (req, res) => {
    req.session = null
    req.logout()
    res.clearCookie('user').redirect('/')
})

module.exports = router
