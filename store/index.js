const SET_INVESTORS = 'SET_INVESTORS'
const SET_MUTED = 'SET_MUTED'
const SET_PROFILE = 'SET_PROFILE'
const SET_USER = 'SET_USER'

export const state = () => ({
    authUser: null,
    investors: [],
    muted: {},
    profile: null,
})

export const getters = {
    allInvestorUsernames: (state) => state.investors.map((i) => i.username),
    isLoggedIn: (state) => !!state.authUser,
    unmutedInvestors: (state) =>
        state.investors.filter(
            (i) => !Object.prototype.hasOwnProperty.call(state.muted, i.id),
        ),
    mutedInvestors: (state) =>
        state.investors.filter((i) =>
            Object.prototype.hasOwnProperty.call(state.muted, i.id),
        ),
}

export const mutations = {
    [SET_INVESTORS](state, investors) {
        state.investors = investors
    },
    [SET_MUTED](state, muted) {
        state.muted = muted
    },
    [SET_PROFILE](state, profile) {
        state.profile = profile
    },
    [SET_USER](state, user) {
        state.authUser = user
    },
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req.session?.username) {
            commit(SET_USER, req.session)
        }
    },
    async bootstrap({ commit }) {
        const {
            data: { profile, investors, mutes },
        } = await this.$axios.$get('/api/bootstrap')
        commit(SET_PROFILE, profile)
        commit(SET_INVESTORS, investors)
        const muted = mutes.reduce((result, id) => {
            result[id] = 1
            return result
        }, {})
        commit(SET_MUTED, muted)
    },
    async createMutes({ commit, getters, state }) {
        await this.$axios.$post('/api/mutes/create', {
            usernames: getters.selectedInvestorUsernames,
        })
        state.investors.forEach((investor) => {
            if (
                Object.prototype.hasOwnProperty.call(
                    state.selectedInvestorsMap,
                    investor.username,
                )
            ) {
                commit(SET_MUTED, {
                    ...state.muted,
                    [investor.id]: 1,
                })
            }
        })
    },
    async destroyMutes({ commit, getters, state }) {
        await this.$axios.$post('/api/mutes/destroy', {
            usernames: getters.allInvestorUsernames,
        })
        commit(SET_MUTED, {})
    },
    async logout({ commit }) {
        await this.$axios.$post('/logout')
        commit(SET_USER, null)
    },
}
