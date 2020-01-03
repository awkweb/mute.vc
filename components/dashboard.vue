<template>
    <div class="md:bg-gray-light h-full min-h-screen">
        <div
            v-scroll="handleScroll"
            class="
                bg-background
                md:border-l
                md:border-r
                h-full
                md:max-w-xl
                md:mx-auto
                relative
                md:shadow-md
            "
            style="padding-bottom: 3.5rem;"
        >
            <Nav :shadow="topShadow" />
            <List />
            <Toolbar :shadow="bottomShadow" />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import List from './list'
import Nav from './nav'
import Toolbar from './toolbar'

export default {
    components: {
        List,
        Nav,
        Toolbar,
    },
    data: () => ({
        bottomShadow: false,
        topShadow: false,
    }),
    computed: {
        ...mapGetters(['tabCount']),
        ...mapState(['authUser', 'tab']),
        title() {
            return `${this.$options.filters.capitalize(this.tab)} (${
                this.tabCount
            })`
        },
    },
    watch: {
        $route(to, from) {
            const nextTab = to.query?.tab
            if (nextTab) {
                this.$store.commit('SET_TAB', nextTab)
                this.$nextTick(() => this.initShadow())
            }
        },
    },
    mounted() {
        this.initShadow()
    },
    methods: {
        initShadow() {
            const documentEl = document.documentElement
            const winScroll = document.body.scrollTop || documentEl.scrollTop
            this.bottomShadow =
                documentEl.scrollHeight > documentEl.clientHeight
            this.topShadow = winScroll !== 0
        },
        handleScroll(event, el) {
            const documentEl = document.documentElement
            const winScroll = document.body.scrollTop || documentEl.scrollTop
            const height = documentEl.scrollHeight - documentEl.clientHeight
            const scrolled = (winScroll / height) * 100

            if (scrolled === 0) {
                this.topShadow = false
            } else if (scrolled > 0 && scrolled < 100) {
                if (!this.bottomShadow) this.bottomShadow = true
                if (!this.topShadow) this.topShadow = true
            } else if (scrolled === 100) {
                this.bottomShadow = false
            }
        },
    },
    head() {
        return {
            title: this.title,
        }
    },
}
</script>
