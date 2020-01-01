const SET_INITIAL_DATA = 'SET_INITIAL_DATA'
const SET_INVESTORS = 'SET_INVESTORS'
const SET_LAST_ACTION = 'SET_LAST_ACTION'
const SET_TAB = 'SET_TAB'
const SET_USER = 'SET_USER'

export const state = () => ({
    authUser: null,
    investors: [],
    lastAction: null,
    profile: null,
    tab: 'unmuted',
})

export const getters = {
    anyOn: (state, getters) =>
        getters.tabInvestors.some((t) => t.on || t.on === undefined),
    isLoggedIn: (state) => !!state.authUser,
    isMutedTab: (state) => state.tab === 'muted',
    tabInvestors: (state, getters) =>
        state.investors.filter((i) =>
            getters.isMutedTab ? i.muted : !i.muted,
        ),
    tabCount: (state, getters) => getters.tabInvestors.length,
}

export const mutations = {
    [SET_INITIAL_DATA](state, { investors, profile }) {
        state.investors = investors
        state.profile = profile
    },
    [SET_INVESTORS](state, investors) {
        state.investors = investors
    },
    [SET_LAST_ACTION](state, action) {
        state.lastAction = action
    },
    [SET_TAB](state, tab) {
        const investors = state.investors.map((i) => ({
            ...i,
            on: true,
            muted: i.on || i.on === undefined ? i.muted : !i.muted,
        }))
        state.investors = investors
        state.tab = tab
        state.lastAction = null
    },
    [SET_USER](state, user) {
        state.authUser = user
    },
}

const followerSorter = (a, b) => b.followersCount - a.followersCount
const flipInvestors = (investors, usernames, on) => {
    const changedInvestors = investors.filter((i) =>
        usernames.includes(i.username),
    )
    const updatedInvestors = changedInvestors.map((i) => ({
        ...i,
        on,
    }))
    return [
        ...investors.filter((i) => !usernames.includes(i.username)),
        ...updatedInvestors,
    ].sort(followerSorter)
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
            const investors = data.investors.sort(followerSorter)
            commit(SET_INITIAL_DATA, {
                profile,
                investors,
            })
        } catch (err) {}
    },
    async createMutes({ commit, getters, state }, data) {
        try {
            const { usernames, undo } = data
            await this.$axios.$post('/api/mutes/create', { usernames })
            const investors = flipInvestors(
                state.investors,
                usernames,
                getters.isMutedTab,
            )
            commit(SET_INVESTORS, investors)
            const lastAction = undo ? null : { type: 'mute', usernames }
            commit(SET_LAST_ACTION, lastAction)
        } catch (err) {}
    },
    async destroyMutes({ commit, getters, state }, data) {
        try {
            const { usernames, undo } = data
            await this.$axios.$post('/api/mutes/destroy', { usernames })
            const investors = flipInvestors(
                state.investors,
                usernames,
                !getters.isMutedTab,
            )
            commit(SET_INVESTORS, investors)
            const lastAction = undo ? null : { type: 'unmute', usernames }
            commit(SET_LAST_ACTION, lastAction)
        } catch (err) {}
    },
    async logOut({ commit }) {
        try {
            await this.$axios.$post('/logout')
            commit(SET_USER, null)
        } catch (err) {}
    },
}
