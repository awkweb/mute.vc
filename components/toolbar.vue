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
        :style="{
            boxShadow: shadow ? '0 -3px 6px -3px rgba(0, 0, 0, 0.15)' : '',
        }"
        style="height: 3.59375rem;"
    >
        <button @click="logOut">
            <img
                v-if="profile"
                :src="profile.profileImageUrlHttps | twitterImageUrl"
                class="bg-gray-200 rounded-full"
                style="height: 2.25rem; width: 2.25rem;"
            />
        </button>
        <button
            v-show="tabInvestors.length > 0"
            :disabled="loading"
            class="
                bg-black
                border
                border-black
                disabled:opacity-50
                disabled:pointer-events-none
                focus:shadow-outline
                font-bold
                md:hover:bg-red
                md:hover:border-red
                md:hover:text-white
                outline-none
                px-4
                py-2
                rounded-full
                text-15
                text-white
            "
            @click="click"
        >
            {{ actionText }}
        </button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    props: {
        shadow: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({ muted: false, loading: false }),
    computed: {
        ...mapGetters(['tabInvestors']),
        ...mapState(['profile', 'tab']),
        isMutedTab() {
            return this.tab === 'muted'
        },
        actionText() {
            const root = this.isMutedTab ? 'Unmut' : 'Mut'
            return this.loading ? `${root}ing...` : `${root}e`
        },
    },
    methods: {
        async click() {
            try {
                this.loading = true
                const usernames = this.tabInvestors.map((t) => t.username)
                if (this.isMutedTab) {
                    await this.$store.dispatch('destroyMutes', usernames)
                } else {
                    await this.$store.dispatch('createMutes', usernames)
                }
                this.muted = !this.muted
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
