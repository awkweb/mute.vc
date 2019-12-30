import Vue from 'vue'

function nFormatter(number, digits = 1) {
    const si = [
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'k' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    let i
    for (i = 0; i < si.length; i++) {
        if (number >= si[i].value) {
            return (
                (number / si[i].value).toFixed(digits).replace(rx, '$1') +
                si[i].symbol
            )
        }
    }
    return number.toFixed(digits).replace(rx, '$1')
}

function twitterImageUrl(image) {
    return image.replace('normal', 'bigger')
}

Vue.filter('nFormatter', nFormatter)
Vue.filter('twitterImageUrl', twitterImageUrl)
