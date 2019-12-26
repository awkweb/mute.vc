module.exports = {
    mode: 'universal',
    head: {
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} ~ mute.vc` : 'mute.vc'
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
                content: process.env.npm_package_description || '',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        metaInfo: {
            noscript: [
                { innerHTML: 'This website requires JavaScript. Sorry :(' },
            ],
        },
    },
    loading: { color: '#fff' },
    css: [],
    plugins: ['@plugins/filters.js'],
    buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
    modules: ['@nuxtjs/axios', '@nuxtjs/dotenv'],
    axios: {},
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
                // https://nuxtjs.org/guide/release-notes/#v2.6.0
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
