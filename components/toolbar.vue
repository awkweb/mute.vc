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
            justify-between
            md:border-l
            md:border-r
            md:max-w-xl
            md:mx-auto
            px-4
            py-2
        "
    >
        <button @click="logOut">
            <img
                v-if="profile"
                :src="profile.profileImageUrlHttps | twitterImageUrl"
                class="bg-gray-200 h-8 mr-4 rounded-full w-8"
            />
        </button>
        <button
            v-show="tabInvestors.length > 0"
            :disabled="loading"
            class="
                disabled:pointer-events-none
                disabled:opacity-75
                focus:shadow-outline
                md:hover:bg-red
                md:hover:border-red
                md:hover:text-white
                border
                border-black
                bg-black
                font-bold
                outline-none
                px-4
                py-1
                rounded-full
                text-white
                text-15
            "
            @click="click"
        >
            {{ actionText | capitalize }}
        </button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    data: () => ({ loading: false }),
    computed: {
        ...mapGetters(['tabInvestors']),
        ...mapState(['profile', 'tab']),
        actionText() {
            return this.tab === 'muted' ? 'unmute all' : 'mute all'
        },
    },
    methods: {
        click() {
            try {
                this.loading = true
                // if (this.muted) {
                //     await this.$store.dispatch('destroyMutes', [this.username])
                // } else {
                //     await this.$store.dispatch('createMutes', [this.username])
                // }
                // this.muted = !this.muted
            } finally {
                this.loading = false
            }
        },
        logOut() {
            this.$store.dispatch('logOut')
            this.$router.push({ path: '/' })
        },
    },
}
</script>
