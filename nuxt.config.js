const dev = process.env.NODE_ENV !== 'production'
const devModules = []
if (dev) {
    require('dotenv').config()
    devModules.push('@nuxtjs/dotenv')
}

const title = 'Mute investors on Twitter'
const description = process.env.npm_package_description

module.exports = {
    mode: 'universal',
    head: {
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} ~ Mute.vc` : 'Mute.vc'
        },
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
            { name: 'twitter:image', content: '' },
            { name: 'twitter:card', content: 'summary' },
            { property: 'og:url', content: 'https://mute.vc' },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: '' },
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
            class: ['container'],
        },
    },
    loading: { color: '#fff' },
    css: [],
    plugins: ['@plugins/filters.js'],
    buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
    modules: [...devModules, '@nuxtjs/axios', 'nuxt-purgecss'],
    axios: {
        https: !dev,
    },
    build: {
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
