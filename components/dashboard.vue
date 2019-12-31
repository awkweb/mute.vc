<template>
    <div class="md:bg-gray-100 h-full min-h-screen">
        <div
            class="
                bg-white
                md:border-gray-300
                md:border-l
                md:border-r
                h-full
                md:max-w-xl
                md:mx-auto
                pb-12
                relative
            "
        >
            <Nav />
            <ul style="min-height: calc(100vh - 6.25rem)">
                <Item
                    v-for="investor in tabInvestors"
                    :key="investor.id"
                    :bio="investor.description"
                    :image="investor.profileImageUrlHttps"
                    :name="investor.name"
                    :username="investor.username"
                    :verified="investor.verified"
                />
            </ul>
            <Toolbar />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Item from './item'
import Nav from './nav'
import Toolbar from './toolbar'

export default {
    components: {
        Item,
        Nav,
        Toolbar,
    },
    computed: {
        ...mapGetters(['tabInvestors']),
        ...mapState(['authUser', 'tab']),
    },
    watch: {
        $route(to, from) {
            const nextTab = to.query?.tab
            if (nextTab) {
                this.$store.commit('SET_TAB', nextTab)
            }
        },
    },
    head() {
        const title = `${this.$options.filters.capitalize(this.tab)} (${
            this.tabInvestors?.length
        })`
        return {
            title,
        }
    },
}
</script>
