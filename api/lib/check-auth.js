const jwt = require('jsonwebtoken')
const getDatabase = require('./get-database')
const getTwit = require('./get-twit')

function checkAuth(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    const user = jwt.verify(req.cookies.user, process.env.SECRET)
    if (!user) {
        res.sendStatus(403)
        return
    }
    req.user = user
    req.db = getDatabase()
    req.twit = getTwit(user.token, user.secret)
    next()
}

module.exports = checkAuth
