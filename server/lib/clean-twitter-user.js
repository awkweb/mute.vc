const { camelize } = require('@ridi/object-case-converter')

function cleanTwitterUser(data) {
    const {
        entities,
        /* eslint-disable-next-line camelcase */
        status: { place, retweetedStatus, ...status },
        screenName,
        ...cleaned
    } = camelize(data, { recursive: true })
    return {
        ...cleaned,
        username: screenName,
        status,
    }
}

module.exports = cleanTwitterUser
