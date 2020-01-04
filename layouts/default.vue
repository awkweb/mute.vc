<template>
    <div>
        {{ error }}
        <nuxt />
    </div>
</template>

<script>
import { mapState } from 'vuex'

const sharedColors = {
    link: 'hsl(203, 79%, 49%)',
    primary: {
        default: 'hsl(203, 89%, 53%)',
        dark: 'hsl(203, 79%, 48%)',
    },
    red: 'hsl(341, 73%, 46%)',
}

const appearances = {
    light: {
        ...sharedColors,
        background: 'hsl(104, 100%, 100%)',
        'background-app': 'hsl(0, 0%, 98%)',
        body: 'hsl(0, 0%, 0%)',
        border: 'hsl(204, 25%, 92%)',
        description: 'hsl(198, 11%, 38%)',
        title: 'hsl(210, 13%, 9%)',
        gray: {
            light: 'hsl(204, 33%, 97%)',
            default: 'hsl(204, 25%, 92%)',
            dark: 'hsl(204, 11%, 83%)',
        },
        shadow: {
            bar: 'rgba(0, 0, 0, 0.15)',
            dark: 'rgba(0, 0, 0, 0.1)',
            light: 'rgba(0, 0, 0, 0.05)',
        },
        verified: 'hsl(203, 89%, 53%)',
    },
    dark: {
        ...sharedColors,
        background: 'hsl(0, 0%, 0%)',
        'background-app': 'hsl(0, 0%, 4%)',
        body: 'hsl(104, 100%, 100%)',
        border: 'hsl(206, 7%, 20%)',
        description: 'hsl(208, 6%, 52%)',
        title: 'hsl(0, 0%, 85%)',
        gray: {
            light: 'hsl(214, 14%, 10%)',
            default: 'hsl(214, 10%, 14%)',
            dark: 'hsl(214, 6%, 23%)',
        },
        shadow: {
            bar: 'rgba(255, 255, 255, 0.2)',
            dark: 'rgba(255, 255, 255, 0.1)',
            light: 'rgba(255, 255, 255, 0.04)',
        },
        verified: 'hsl(0, 0%, 85%)',
    },
}

export default {
    computed: {
        ...mapState(['appearance', 'error']),
        cssText() {
            const appearance = this.appearance ?? 'dark'
            const { [appearance]: colors } = appearances
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
    beforeMount() {
        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        mql.addListener(this.colorSchemeListener)
        if (!this.appearance) this.colorSchemeListener(mql)
    },
    methods: {
        colorSchemeListener(event) {
            const appearance = event.matches ? 'dark' : 'light'
            this.$store.commit('SET_APPEARANCE', appearance)
            this.$cookies.set('appearance', appearance, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            })
        },
    },
    head() {
        return {
            style: [{ cssText: this.cssText, type: 'text/css' }],
        }
    },
}
</script>
