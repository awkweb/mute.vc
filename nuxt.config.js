const dev = process.env.NODE_ENV !== 'production'
const devModules = []
const prodModules = []
if (dev) {
    require('dotenv').config()
    devModules.push('@nuxtjs/dotenv')
} else {
    prodModules.push('nuxt-purgecss')
}

const title = 'Mute investors on Twitter'
const description = process.env.npm_package_description
const ogTitle = `mute.vc – ${title}`
const ogImage = 'https://mute.vc/card.png'

module.exports = {
    head: {
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: description,
            },
            { name: 'twitter:title', content: ogTitle },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: ogImage },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:creator', content: '@awkweb' },
            { property: 'og:url', content: 'https://mute.vc' },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: ogTitle },
            { property: 'og:description', content: description },
            { property: 'og:image', content: ogImage },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        metaInfo: {
            noscript: [
                { innerHTML: 'This website requires JavaScript. Sorry :(' },
            ],
        },
        htmlAttrs: {
            lang: 'en',
        },
    },
    loading: {
        color: 'hsl(203, 89%, 53%)',
        failedColor: 'hsl(341, 73%, 46%)',
    },
    css: [],
    plugins: ['@plugins/directives', '@plugins/filters'],
    buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
    modules: [
        ...devModules,
        ...prodModules,
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
    ],
    serverMiddleware: {
        '/api': '~/api',
    },
    axios: {
        https: !dev,
    },
    build: {
        extractCSS: true,
        extend(config, ctx) {
            if (ctx.isDev) {
                config.devtool = ctx.isClient
                    ? 'source-map'
                    : 'inline-source-map'
            }
        },
    },
}
