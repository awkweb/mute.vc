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

module.exports = {
    mode: 'universal',
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
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: '/card.png' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:creator', content: '@tomfme' },
            { property: 'og:url', content: 'https://mute.vc' },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: '/card.png' },
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
        bodyAttrs: {
            class: 'max-w-app mx-auto',
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
        babel: {
            plugins: [
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator',
            ],
            presets({ isServer }) {
                return [
                    [
                        require.resolve('@nuxt/babel-preset-app'),
                        {
                            buildTarget: isServer ? 'server' : 'client',
                            corejs: { version: 3 },
                        },
                    ],
                ]
            },
        },
    },
}
