const SET_APPEARANCE = 'SET_APPEARANCE'
const SET_INITIAL_DATA = 'SET_INITIAL_DATA'
const SET_INVESTORS = 'SET_INVESTORS'
const SET_UNDO_ACTION = 'SET_UNDO_ACTION'
const SET_TAB = 'SET_TAB'
const SET_USER = 'SET_USER'

export const state = () => ({
    appearance: 'light',
    authUser: null,
    investors: [],
    undoAction: null,
    loading: false,
    profile: null,
    tab: 'unmuted',
})

export const getters = {
    anyOn: (state, getters) => getters.tabInvestors.some((t) => t.on),
    isLoggedIn: (state) => !!state.authUser,
    isMutedTab: (state) => state.tab === 'muted',
    tabInvestors: (state, getters) =>
        state.investors.filter((i) =>
            getters.isMutedTab ? i.muted : !i.muted,
        ),
    tabCount: (state, getters) => getters.tabInvestors.length,
}

export const mutations = {
    [SET_APPEARANCE](state, appearance) {
        state.appearance = appearance
    },
    [SET_INITIAL_DATA](state, { investors, profile }) {
        state.investors = investors
        state.profile = profile
    },
    [SET_INVESTORS](state, investors) {
        state.investors = investors
    },
    [SET_UNDO_ACTION](state, action) {
        state.undoAction = action
    },
    [SET_TAB](state, tab) {
        const investors = state.investors.map((i) => ({
            ...i,
            on: true,
            muted: i.on ? i.muted : !i.muted,
        }))
        state.investors = investors
        state.tab = tab
        state.undoAction = null
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
    async mute({ commit, getters, state }, data) {
        try {
            const { type, usernames, undo } = data

            await this.$axios.$post(`/api/mutes/${type}`, { usernames })
            const investors = flipInvestors(
                state.investors,
                usernames,
                type === 'destroy' ? !getters.isMutedTab : getters.isMutedTab,
            )
            commit(SET_INVESTORS, investors)

            const undoType = type === 'destroy' ? 'create' : 'destroy'
            const undoAction = undo ? null : { type: undoType, usernames }
            commit(SET_UNDO_ACTION, undoAction)
        } catch (err) {}
    },
    async logOut({ commit }) {
        try {
            await this.$axios.$post('/logout')
            commit(SET_USER, null)
        } catch (err) {}
    },
}
