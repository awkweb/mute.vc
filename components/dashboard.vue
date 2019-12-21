<template>
    <div>
        <div>Ready to mute some VCs, {{ profile.name }}?</div>
        <div>@{{ authUser.username }}</div>
        <button @click="handleLogOut">
            Log out
        </button>
        <form @submit="handleSubmit">
            <div v-show="selectedInvestorCount > 0">
                {{ selectedInvestorCount }} selected
            </div>
            <button
                :disabled="loading || selectedInvestorCount === 0"
                type="submit"
            >
                {{ loading ? 'Muting...' : 'Mute' }}
            </button>
            <ul>
                <li v-for="investor in investors" :key="investor.id">
                    <input
                        :checked="isChecked(investor.screen_name)"
                        :value="investor.screen_name"
                        type="checkbox"
                        @input="handleCheckbox"
                    />
                    <div>{{ investor.name }}</div>
                    <a
                        :href="`https://twitter.com/${investor.screen_name}`"
                        target="_blank"
                    >
                        @{{ investor.screen_name }}
                    </a>
                    <div>
                        {{ investor.followers_count | nFormatter }} followers
                    </div>
                </li>
            </ul>
        </form>
    </div>
</template>

<script>
// `mapActions` and `mapMutations` aren't working :(
import { mapGetters, mapState } from 'vuex'

export default {
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapGetters(['isLoggedIn', 'selectedInvestorCount']),
        ...mapState([
            'authUser',
            'investors',
            'profile',
            'selectedInvestorsMap',
        ]),
    },
    methods: {
        isChecked(username) {
            return Object.prototype.hasOwnProperty.call(
                this.selectedInvestorsMap,
                username,
            )
        },
        handleCheckbox(event) {
            this.$store.commit('SELECT_INVESTOR', event.target.value)
        },
        handleLogOut() {
            this.$store.dispatch('logout')
        },
        async handleSubmit(event) {
            try {
                event.preventDefault()
                this.loading = true
                await this.$store.dispatch('mute')
            } finally {
                this.loading = false
            }
        },
    },
}
</script>
