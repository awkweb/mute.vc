<template>
    <div
        class="
            bg-white
            border-gray-300
            border-t
            bottom-0
            fixed
            flex
            inset-x-0
            md:border-l
            md:border-r
            md:max-w-xl
            md:mx-auto
            px-4
            py-2
        "
    >
        <div class="flex">
            <button @click="handleLogOut">
                <img
                    v-if="profile"
                    :src="profile.profileImageUrlHttps | twitterImageUrl"
                    class="bg-gray-200 h-8 mr-4 rounded-full w-8"
                />
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['profile']),
    },
    methods: {
        handleLogOut() {
            this.$store.dispatch('logOut')
            this.$router.push({ path: '/' })
        },
    },
}
</script>
