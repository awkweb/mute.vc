const { Router } = require('express')
const checkAuth = require('../lib/check-auth')

const router = Router()
router.use(checkAuth)

router.post('/mutes', async (req, res) => {
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

router.delete('/mutes', async (req, res) => {
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

module.exports = router
