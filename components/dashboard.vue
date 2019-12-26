<template>
    <div class="mt-3">
        <div class="flex mb-5 text-secondary text-sm">
            <div>@{{ authUser.username }}</div>
            <button class="ml-2 underline" @click="handleLogOut">
                Log out
            </button>
            <button class="ml-2 underline" @click="handleUndoMutes">
                Undo all mutes
            </button>
        </div>
        <div
            v-if="investors.length > 0"
            :class="selectedInvestorCount > 0 ? 'mb-16' : 'mb-1'"
        >
            <form @submit="handleSubmit">
                <table>
                    <thead>
                        <tr>
                            <th class="align-top pb-4 pl-2 pr-6">
                                <input
                                    class="mt-1"
                                    :checked="allSelected"
                                    type="checkbox"
                                    value="all"
                                    @input="handleSelectAll"
                                />
                            </th>
                            <th class="align-top pb-4 pr-8 text-left">
                                <span class="font-semibold text-sm">User</span>
                            </th>
                            <th class="align-top pb-4 pr-10 text-left">
                                <span class="font-semibold text-sm">Mutes</span>
                            </th>
                            <th class="align-top pb-4 pr-10 text-left">
                                <span class="font-semibold text-sm">
                                    Followers
                                </span>
                            </th>
                            <th class="align-top pb-4 pr-10 text-left">
                                <span class="font-semibold text-sm">Bio</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="investor in investors"
                            :key="investor.id"
                            class="hover:bg-light"
                        >
                            <td class="align-top pb-4 pl-2 pr-6 pt-1">
                                <input
                                    class="mt-1"
                                    :checked="isChecked(investor.username)"
                                    :value="investor.username"
                                    type="checkbox"
                                    @input="handleCheckbox"
                                />
                            </td>
                            <td class="align-top pb-4 pr-8 pt-1">
                                <div class="flex">
                                    <img
                                        class="bg-light h-8 mr-5 mt-1 rounded-full w-8"
                                        :src="investor.profileImageUrlHttps"
                                    />
                                    <div class="flex flex-col">
                                        <div>{{ investor.name }}</div>
                                        <a
                                            class="leading-tight text-secondary text-sm"
                                            :href="
                                                `https://twitter.com/${investor.username}`
                                            "
                                            target="_blank"
                                        >
                                            @{{ investor.username }}
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td class="align-top pb-4 pr-10 pt-1">
                                {{ (investor.mutes || 0) | nFormatter }}
                            </td>
                            <td class="align-top pb-4 pr-10 pt-1">
                                {{ investor.followersCount | nFormatter }}
                            </td>
                            <td class="align-top pb-4 pt-1">
                                <!-- eslint-disable vue/no-v-html -->
                                <div
                                    class="max-w-xs overflow-hidden text-sm"
                                    style="box-orient: vertical; display: -webkit-box; line-clamp: 2; max-height: 42px;"
                                    v-html="link(investor.description)"
                                />
                                <!--eslint-enable-->
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div
                    v-show="selectedInvestorCount > 0"
                    class="bg-background bottom-0 fixed inset-x-0"
                    style="box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px 0px;"
                >
                    <div class="container flex items-center py-3">
                        <button
                            class="bg-body font-semibold px-5 py-2 rounded text-background text-sm"
                            :disabled="loading || selectedInvestorCount === 0"
                            type="submit"
                        >
                            {{ loading ? 'Muting...' : 'Mute' }}
                        </button>
                        <div class="ml-3 text-secondary text-sm">
                            {{ selectedInvestorCount }} selected
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
// `mapActions` and `mapMutations` aren't working :(
import { mapGetters, mapState } from 'vuex'
import Autolinker from 'autolinker'

export default {
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapGetters(['allSelected', 'isLoggedIn', 'selectedInvestorCount']),
        ...mapState(['authUser', 'investors', 'selectedInvestorsMap']),
    },
    methods: {
        link(text) {
            return Autolinker.link(text, {
                hashtag: 'twitter',
                mention: 'twitter',
                truncate: 25,
            })
        },
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
        handleSelectAll() {
            this.$store.commit('SELECT_ALL')
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
        async handleUndoMutes() {
            await this.$store.dispatch('undo')
        },
    },
}
</script>
