const express = require('express')
const session = require('cookie-session')
const parser = require('cookie-parser')

const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days

// Create express instance
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

// Require API routes
const auth = require('./routes/auth')
const mutes = require('./routes/mutes')
const users = require('./routes/users')

// Import API Routes
app.use(auth)
app.use(mutes)
app.use(users)
app.get('/healthz', (_req, res) => res.sendStatus(200))

// Export express app
module.exports = app
