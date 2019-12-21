module.exports = {
    mode: 'universal',
    head: {
        title: process.env.npm_package_name || '',
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
    },
    loading: { color: '#fff' },
    css: [],
    plugins: ['@plugins/filters.js'],
    buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
    modules: ['@nuxtjs/axios', '@nuxtjs/dotenv'],
    axios: {},
    build: {
        extend(config, ctx) {},
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
