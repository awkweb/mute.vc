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
                    border-gray-300
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
                style="box-shadow: rgba(0, 0, 0, 0.05) 0px 8px 24px 0px;"
            >
                <div class="flex h-full" style="padding-top: 2px;">
                    <Tab
                        name="unmuted"
                        :current="tab"
                        @select="handleSelectTab"
                    />
                    <Tab
                        name="muted"
                        :current="tab"
                        @select="handleSelectTab"
                    />
                </div>
                <div class="flex">
                    <button
                        class="font-medium mr-4 text-gray-700"
                        style="font-size: 0.9375rem;"
                        @click="handleLogOut"
                    >
                        Log Out
                    </button>
                    <img
                        :src="profile.profileImageUrlHttps | twitterImageUrl"
                        class="h-8 rounded-full w-8"
                    />
                </div>
            </div>
            <ul>
                <Item
                    v-for="investor in tabInvestors"
                    :key="investor.id"
                    :bio="investor.description"
                    :image="investor.profile_image_url_https"
                    :name="investor.name"
                    :username="investor.screen_name"
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
    methods: {
        handleSelectTab(tab) {
            this.$store.commit('SET_TAB', tab)
        },
        handleLogOut() {
            this.$store.dispatch('logout')
        },
    },
}
</script>
