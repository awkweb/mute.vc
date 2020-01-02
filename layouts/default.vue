<template>
    <div>
        <button @click="click">toggle</button>
        <nuxt />
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['appearance']),
        colors() {
            if (this.appearance === 'dark') {
                return {
                    background: 'hsl(0, 0%, 0%)',
                }
            } else {
                return {
                    background: 'hsl(104, 100%, 100%)',
                }
            }
        },
        cssText() {
            const { background } = this.colors
            return `
                :root {
                    --color-background: ${background};
                }
            `
        },
    },
    methods: {
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
