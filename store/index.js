const SET_INITIAL_DATA = 'SET_INITIAL_DATA'
const SET_TAB = 'SET_TAB'
const SET_USER = 'SET_USER'

export const state = () => ({
    authUser: null,
    investors: [],
    mutesMap: {},
    profile: null,
    tab: 'unmuted',
})

export const getters = {
    isLoggedIn: (state) => !!state.authUser,
    unmutedInvestors: (state) =>
        state.investors.filter(
            (i) => !Object.prototype.hasOwnProperty.call(state.mutesMap, i.id),
        ),
    mutedInvestors: (state) =>
        state.investors.filter((i) =>
            Object.prototype.hasOwnProperty.call(state.mutesMap, i.id),
        ),
    tabInvestors: (state, getters) =>
        state.tab === 'muted'
            ? getters.mutedInvestors
            : getters.unmutedInvestors,
}

export const mutations = {
    [SET_INITIAL_DATA](state, data) {
        const { investors, mutesMap, profile } = data
        state.mutesMap = mutesMap
        state.investors = investors
        state.profile = profile
    },
    [SET_TAB](state, tab) {
        state.tab = tab
    },
    [SET_USER](state, user) {
        state.authUser = user
    },
}

export const actions = {
    nuxtServerInit({ commit }, { req, route }) {
        if (req.session?.username) {
            commit(SET_USER, req.session)
            const tab = route.query?.tab
            if (tab) {
                commit(SET_TAB, tab)
            }
        }
    },
    async bootstrap({ commit }) {
        try {
            const {
                data,
                data: { profile },
            } = await this.$axios.$get('/api/bootstrap')
            const investors = data.investors.sort(
                (a, b) => b.followersCount - a.followersCount,
            )
            const mutesMap = data.mutes.reduce((result, id) => {
                result[id] = 1
                return result
            }, {})
            commit(SET_INITIAL_DATA, {
                profile,
                investors,
                mutesMap,
            })
        } catch (err) {}
    },
    createMutes({ commit, getters, state }, usernames) {
        try {
            // await this.$axios.$post('/api/mutes/create', { usernames })
        } catch (err) {}
    },
    destroyMutes({ commit, getters, state }, usernames) {
        try {
            // await this.$axios.$post('/api/mutes/destroy', { usernames })
        } catch (err) {}
    },
    async logOut({ commit }) {
        try {
            await this.$axios.$post('/logout')
            commit(SET_USER, null)
        } catch (err) {}
    },
}
