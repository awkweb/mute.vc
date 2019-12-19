const SET_PROFILE = 'SET_PROFILE'
const SET_USER = 'SET_USER'

export const state = () => ({
    authUser: null,
    profile: null,
})

export const getters = {
    isLoggedIn: (state) => !!state.authUser,
}

export const mutations = {
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
    async me({ commit, getters }) {
        if (getters.isLoggedIn) {
            try {
                const res = await this.$axios.$get('/api/me')
                commit(SET_PROFILE, res.data)
            } catch (err) {
                console.error(err)
            }
        }
    },
}
