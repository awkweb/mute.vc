import Vue from 'vue'

function capitalize(value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
}

function twitterImageUrl(image) {
    return image.replace('normal', 'bigger')
}

Vue.filter('capitalize', capitalize)
Vue.filter('twitterImageUrl', twitterImageUrl)
