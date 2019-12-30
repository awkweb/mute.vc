<template>
    <div class="bg-gray-100 h-full">
        <div
            class="
                bg-white
                border-gray-300
                border-l
                border-r
                h-screen
                max-w-2xl
                mx-auto
            "
        >
            <div
                class="
                    border-b
                    border-gray-300
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                "
            >
                <div>
                    Muted
                </div>
                <div class="flex">
                    <button
                        class="mr-4 text-gray-700 text-sm"
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
                    v-for="investor in unmutedInvestors"
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
// `mapActions` and `mapMutations` aren't working :(
import { mapState, mapGetters } from 'vuex'
import Item from './item'

export default {
    components: {
        Item,
    },
    computed: {
        ...mapGetters(['unmutedInvestors']),
        ...mapState(['authUser', 'profile']),
    },
    methods: {
        handleLogOut() {
            this.$store.dispatch('logout')
        },
    },
}
</script>
