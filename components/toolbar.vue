<template>
    <div
        class="
            bg-background
            border-t
            bottom-0
            fixed
            flex
            inset-x-0
            items-center
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
        style="height: 3.59375rem; transition: box-shadow 0.5s;"
    >
        <div class="flex">
            <button
                class="
                    bg-gray
                    border
                    border-transparent
                    h-avatar
                    mr-2
                    overflow-hidden
                    rounded-full
                    w-avatar
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
        <div
            v-if="error"
            class="
                flex
                flex-col
                items-center
                leading-tight
                text-center
                text-red
                text-sm
            "
        >
            <div>{{ error.message }}</div>
            <div v-show="error.description" class="hidden md:block">
                {{ error.description }}
            </div>
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
                    mr-2
                    outline-none
                    px-4
                    py-2
                    rounded-full
                    text-15
                    text-title
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
                    whitespace-no-wrap
                "
                :class="
                    isDark ? 'md:hover:text-white' : 'md:hover:text-background'
                "
                @click="all"
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
        ...mapState(['error', 'undoAction', 'profile', 'tab']),
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
        async all() {
            try {
                this.loading = true
                const type = this.isMutedTab ? 'destroy' : 'create'
                const usernames = this.tabInvestors
                    .filter((t) => t.on)
                    .map((t) => t.username)
                const data = {
                    type,
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
