const RESET_FORM = 'RESET_FORM'
const SELECT_ALL = 'SELECT_ALL'
const SELECT_INVESTOR = 'SELECT_INVESTOR'
const SET_PROFILE = 'SET_PROFILE'
const SET_INVESTORS = 'SET_INVESTORS'
const SET_USER = 'SET_USER'

export const state = () => ({
    authUser: null,
    investors: [],
    selectedInvestorsMap: {},
    profile: null,
})

export const getters = {
    allSelected: (state) =>
        state.investors.length > 0 &&
        Object.keys(state.selectedInvestorsMap).length ===
            state.investors.length,
    isLoggedIn: (state) => !!state.authUser,
    selectedInvestorUsernames: (state) =>
        Object.keys(state.selectedInvestorsMap),
    selectedInvestorCount: (state, getters) =>
        getters.selectedInvestorUsernames.length,
}

export const mutations = {
    [SELECT_ALL](state) {
        if (
            Object.keys(state.selectedInvestorsMap).length ===
            state.investors.length
        ) {
            state.selectedInvestorsMap = {}
        } else {
            state.selectedInvestorsMap = state.investors.reduce(
                (result, item) => {
                    result[item.screen_name] = 1
                    return result
                },
                {},
            )
        }
    },
    [SELECT_INVESTOR](state, username) {
        if (
            Object.prototype.hasOwnProperty.call(
                state.selectedInvestorsMap,
                username,
            )
        ) {
            const { [username]: removed, ...rest } = state.selectedInvestorsMap
            state.selectedInvestorsMap = rest
        } else {
            state.selectedInvestorsMap = {
                ...state.selectedInvestorsMap,
                [username]: 1,
            }
        }
    },
    [SET_INVESTORS](state, investors) {
        state.investors = investors
    },
    [SET_PROFILE](state, profile) {
        state.profile = profile
    },
    [SET_USER](state, user) {
        state.authUser = user
    },
    [RESET_FORM](state) {
        state.selectedInvestorsMap = {}
    },
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req.session?.username) {
            commit(SET_USER, req.session)
        }
    },
    async bootstrap({ commit, getters }) {
        if (getters.isLoggedIn) {
            try {
                const res = await this.$axios.$get('/api/me')
                commit(SET_PROFILE, res.data)
                const resx = await this.$axios.$get('/api/investors')
                commit(SET_INVESTORS, resx.data)
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err)
            }
        }
    },
    async mute({ commit, getters }) {
        await this.$axios.$post('/api/mutes', {
            usernames: getters.selectedInvestorUsernames,
        })
        commit(RESET_FORM)
    },
    async logout({ commit }) {
        await this.$axios.$post('/logout')
        commit(SET_USER, null)
    },
}
