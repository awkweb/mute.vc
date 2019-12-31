<template>
    <div class="md:bg-gray-100 h-full min-h-screen">
        <div
            class="
                bg-white
                border-gray-300
                border-l
                border-r
                h-full
                min-h-screen
                md:max-w-2xl
                md:mx-auto
            "
        >
            <div
                class="
                    bg-white
                    border-b
                    border-gray-400
                    flex
                    h-12
                    md:h-16
                    items-center
                    justify-between
                    pt-1
                    px-4
                    sticky
                    top-0
                "
            >
                <div class="flex h-full" style="padding-top: 2px;">
                    <Tab name="unmuted" />
                    <Tab name="muted" />
                </div>
                <div class="flex">
                    <button
                        class="font-medium text-gray-700 text-15"
                        @click="handleLogOut"
                    >
                        Log Out
                    </button>
                    <img
                        v-if="profile"
                        :src="profile.profileImageUrlHttps | twitterImageUrl"
                        class="h-8 ml-4 rounded-full w-8"
                    />
                </div>
            </div>
            <ul>
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
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Item from './item'
import Tab from './tab'

export default {
    components: {
        Item,
        Tab,
    },
    computed: {
        ...mapGetters(['tabInvestors']),
        ...mapState(['authUser', 'profile', 'tab']),
    },
    watch: {
        $route(to, from) {
            const nextTab = to.query?.tab
            if (nextTab) {
                this.$store.commit('SET_TAB', nextTab)
            }
        },
    },
    methods: {
        handleLogOut() {
            this.$store.dispatch('logOut')
            this.$router.push({ path: '/' })
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
