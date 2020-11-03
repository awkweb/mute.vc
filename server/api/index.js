const express = require('express')
const parser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const Twit = require('twit')
const { camelize } = require('@ridi/object-case-converter')
const firebase = require('firebase')
require('firebase/firestore')

const app = express()
app.use(parser())
app.use(express.json())
app.use('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    const user = jwt.verify(req.cookies.user, process.env.SECRET)
    if (!user) {
        res.sendStatus(403)
        return
    }
    req.user = user
    req.db = getDb()
    req.twit = getTwit(user.token, user.secret)
    next()
})

function softFail(promise) {
    return new Promise((resolve) => {
        promise.then(resolve).catch(resolve)
    })
}

function camelizeUser(data) {
    return camelize(
        { ...data, username: data.screen_name },
        {
            recursive: true,
        },
    )
}

function getTwit(token, secret) {
    return new Twit({
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET,
        access_token: token,
        access_token_secret: secret,
    })
}

function getDb() {
    return !firebase.apps.length
        ? firebase
              .initializeApp({
                  apiKey: process.env.FIREBASE_API_KEY,
                  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                  projectId: process.env.FIREBASE_PROJECT_ID,
              })
              .firestore()
        : firebase.app().firestore()
}

app.get('/bootstrap', async (req, res) => {
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

app.post('/mutes', async (req, res) => {
    try {
        const { usernames } = req.body
        const promises = usernames.map((x) =>
            req.twit.post('mutes/users/create', {
                screen_name: x,
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

app.delete('/mutes', async (req, res) => {
    try {
        const { usernames } = req.body
        const promises = usernames.map((x) =>
            req.twit.post('mutes/users/destroy', {
                screen_name: x,
            }),
        )
        await Promise.all(promises)
        res.send({ status: 200 })
    } catch (err) {
        console.log(err)
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

module.exports = {
    path: '/api',
    handler: app,
}
