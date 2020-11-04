const { camelize } = require('@ridi/object-case-converter')

function camelizeUser(data) {
    return camelize(
        { ...data, username: data.screen_name },
        {
            recursive: true,
        },
    )
}

module.exports = camelizeUser
