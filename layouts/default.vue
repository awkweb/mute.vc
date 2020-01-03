<template>
    <nuxt />
</template>

<script>
import { mapState } from 'vuex'

const sharedColors = {
    link: 'hsl(203, 79%, 49%)',
    primary: {
        default: 'hsl(203, 89%, 53%)',
        dark: 'hsl(203, 79%, 48%)',
    },
}

const appearances = {
    light: {
        ...sharedColors,
        background: 'hsl(104, 100%, 100%)',
        body: 'hsl(0, 0%, 0%)',
        border: 'hsl(204, 25%, 92%)',
        description: 'hsl(198, 11%, 38%)',
        title: 'hsl(210, 13%, 9%)',
        gray: {
            light: 'hsl(204, 33.3%, 97.1%)',
            default: 'hsl(204, 25%, 92.2%)',
            dark: 'hsl(205, 16.4%, 71.4%)',
        },
        verified: 'hsl(203, 89%, 53%)',
    },
    dark: {
        ...sharedColors,
        background: 'hsl(0, 0%, 0%)',
        body: 'hsl(104, 100%, 100%)',
        border: 'hsl(206, 7%, 20%)',
        description: 'hsl(208, 6%, 52%)',
        title: 'hsl(0, 0%, 85%)',
        gray: {
            light: 'hsl(214.3, 14.3%, 9.6%)',
            default: 'hsl(214.3, 9.9%, 13.9%)',
            dark: 'hsl(210, 6.2%, 25.5%)',
        },
        verified: 'hsl(0, 0%, 85%)',
    },
}

export default {
    data: () => ({
        mql: null,
    }),
    computed: {
        ...mapState(['appearance']),
        cssText() {
            const { [this.appearance]: colors } = appearances
            const vars = []
            for (const [key, value] of Object.entries(colors)) {
                if (typeof value === 'object') {
                    for (const [k, v] of Object.entries(value)) {
                        vars.push(`--colors-${key}-${k}: ${v};`)
                    }
                } else {
                    vars.push(`--colors-${key}: ${value};`)
                }
            }
            return `
                :root {
                    ${vars.join('\n')}
                }
            `
        },
    },
    mounted() {
        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        let appearance = localStorage.getItem('appearance')
        if (!appearance) appearance = mql.matches ? 'dark' : 'light'
        this.$store.commit('SET_APPEARANCE', appearance)

        mql.addEventListener('change', this.handleMediaChange)
        this.mql = mql
    },
    destroyed() {
        this.mql.removeEventListener('change', this.handleMediaChange)
    },
    methods: {
        handleMediaChange() {
            const appearance = this.mql.matches ? 'dark' : 'light'
            this.$store.commit('SET_APPEARANCE', appearance)
        },
        click() {
            const appearance = this.appearance === 'light' ? 'dark' : 'light'
            this.$store.commit('SET_APPEARANCE', appearance)
        },
    },
    head() {
        return {
            style: [{ cssText: this.cssText, type: 'text/css' }],
        }
    },
}
</script>
