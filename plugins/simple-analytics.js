import SimpleAnalytics from 'simple-analytics-vue'
import Vue from 'vue'

Vue.use(SimpleAnalytics, {
    skip: process.env.NODE_ENV !== 'production',
    domain: 'api.mute.vc',
})
