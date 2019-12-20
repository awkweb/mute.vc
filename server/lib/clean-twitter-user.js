function cleanTwitterUser(data) {
    const {
        entities,
        /* eslint-disable-next-line camelcase */
        status: { place, retweeted_status, ...status },
        ...cleaned
    } = data
    return {
        ...cleaned,
        status,
    }
}

module.exports = cleanTwitterUser
