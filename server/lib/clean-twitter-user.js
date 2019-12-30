const { camelize } = require('@ridi/object-case-converter')

function cleanTwitterUser(data) {
    const { entities, screenName, ...cleaned } = camelize(data, {
        recursive: true,
    })
    return {
        ...cleaned,
        username: screenName,
    }
}

module.exports = cleanTwitterUser
