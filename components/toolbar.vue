<template>
    <div
        class="
            bg-background
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
            md:px-4
            px-3
            py-2
        "
        :class="{ 'shadow-bottom': shadow }"
        style="height: 3.59375rem;"
    >
        <div class="flex">
            <button
                class="
                    border
                    border-transparent
                    bg-gray-dark
                    h-avatar
                    w-avatar
                    mr-2
                    rounded-full
                    overflow-hidden
                "
                title="Log Out"
                @click="logOut"
            >
                <img
                    v-if="profile"
                    :src="profile.profileImageUrlHttps | twitterImageUrl"
                />
            </button>
            <AppearanceButton title="Toggle Theme" />
        </div>
        <div>
            <button
                v-show="undoAction"
                :disabled="networkActive"
                class="
                    bg-gray
                    border
                    border-gray
                    disabled:opacity-50
                    disabled:pointer-events-none
                    font-bold
                    md:hover:bg-gray-dark
                    md:hover:border-gray-dark
                    outline-none
                    px-4
                    py-2
                    rounded-full
                    text-15
                    text-title
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
                    bg-body
                    border
                    border-body
                    disabled:opacity-25
                    disabled:pointer-events-none
                    focus:shadow-outline
                    font-bold
                    md:hover:bg-red
                    md:hover:border-red
                    outline-none
                    px-4
                    py-2
                    rounded-full
                    text-15
                    text-background
                "
                :class="
                    isDark ? 'md:hover:text-white' : 'md:hover:text-background'
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
import AppearanceButton from './appearance-button'

export default {
    components: {
        AppearanceButton,
    },
    props: {
        shadow: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({ loading: false, undoing: false }),
    computed: {
        ...mapGetters([
            'anyOn',
            'isDark',
            'isMutedTab',
            'tabInvestors',
            'tabCount',
        ]),
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
