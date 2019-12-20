const SET_PROFILE = 'SET_PROFILE'
const SET_INVESTORS = 'SET_INVESTORS'
const SET_USER = 'SET_USER'

export const state = () => ({
    authUser: null,
    investors: [],
    profile: null,
})

export const getters = {
    isLoggedIn: (state) => !!state.authUser,
}

export const mutations = {
    [SET_INVESTORS](state, investors) {
        state.investors = investors
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
    async logout({ commit }) {
        await this.$axios.$post('/logout')
        commit(SET_USER, null)
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
}
