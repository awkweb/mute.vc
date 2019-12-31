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
    allInvestorUsernames: (state) => state.investors.map((i) => i.username),
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
        state.tab === 'unmuted'
            ? getters.unmutedInvestors
            : getters.mutedInvestors,
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
        const { data } = await this.$axios.$get('/api/bootstrap')
        const mutesMap = data.mutes.reduce((result, id) => {
            result[id] = 1
            return result
        }, {})
        commit(SET_INITIAL_DATA, {
            ...data,
            mutesMap,
        })
    },
    async createMutes({ commit, getters, state }, usernames) {
        await this.$axios.$post('/api/mutes/create', { usernames })
    },
    async destroyMutes({ commit, getters, state }, usernames) {
        await this.$axios.$post('/api/mutes/destroy', { usernames })
    },
    async logOut({ commit }) {
        await this.$axios.$post('/logout')
        commit(SET_USER, null)
    },
}
