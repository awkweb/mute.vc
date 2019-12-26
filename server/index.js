const express = require('express')
const consola = require('consola')
const session = require('cookie-session')
const { Nuxt, Builder } = require('nuxt')

// Import and set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env !== 'production'

const app = express()
app.use(express.json()) // Handle parsing json data from requests
app.use(
    session({
        name: 'token',
        secret: process.env.SECRET,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    }),
)

// Routes
app.use(require('./routes/twitter-login'))
app.use(require('./routes/api'))
app.get('/healthz', (req, res) => res.sendStatus(200))

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
