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
        <div>
            <button
                v-show="undoAction"
                :disabled="networkActive"
                class="
                    bg-gray-200
                    border
                    border-gray-200
                    disabled:opacity-50
                    disabled:pointer-events-none
                    focus:shadow-outline
                    font-bold
                    md:hover:bg-gray-300
                    md:hover:border-gray-300
                    outline-none
                    px-4
                    py-2
                    rounded-full
                    text-15
                    text-gray-900
                    mr-2
                "
                @click="undo"
            >
                {{ undoText }}
            </button>
            <button
                v-show="tabCount > 0"
                :disabled="!anyOn || networkActive"
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
    data: () => ({ loading: false, undoing: false }),
    computed: {
        ...mapGetters(['anyOn', 'isMutedTab', 'tabInvestors', 'tabCount']),
        ...mapState(['undoAction', 'profile', 'tab']),
        networkActive() {
            return this.loading || this.undoing
        },
        undoText() {
            return this.undoing ? `Undoing...` : `Undo`
        },
        actionText() {
            const root = this.isMutedTab ? 'Unmut' : 'Mut'
            return this.loading ? `${root}ing all...` : `${root}e all`
        },
    },
    methods: {
        async click() {
            try {
                this.loading = true
                const usernames = this.tabInvestors
                    .filter((t) => t.on)
                    .map((t) => t.username)
                const data = {
                    type: this.isMutedTab ? 'destroy' : 'create',
                    usernames,
                }
                await this.$store.dispatch('mute', data)
            } finally {
                this.loading = false
            }
        },
        logOut() {
            this.$store.dispatch('logOut')
            this.$router.push({ path: '/' })
        },
        async undo() {
            try {
                this.undoing = true
                const data = {
                    type: this.undoAction.type,
                    usernames: this.undoAction.usernames,
                    undo: true,
                }
                await this.$store.dispatch('mute', data)
            } finally {
                this.undoing = false
            }
        },
    },
}
</script>
