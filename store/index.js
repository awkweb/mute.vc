import jwt from 'jsonwebtoken'

const SET_APPEARANCE = 'SET_APPEARANCE'
const SET_ERROR = 'SET_ERROR'
const SET_INITIAL_DATA = 'SET_INITIAL_DATA'
const SET_INVESTORS = 'SET_INVESTORS'
const SET_TAB = 'SET_TAB'
const SET_UNDO_ACTION = 'SET_UNDO_ACTION'
const SET_USER = 'SET_USER'

export const state = () => ({
    appearance: null,
    authUser: null,
    investors: [],
    undoAction: null,
    loading: false,
    profile: null,
    tab: 'unmuted',
    error: null,
})

export const getters = {
    anyOn: (_state, getters) => getters.tabInvestors.some((t) => t.on),
    isDark: (state) => state.appearance === 'dark',
    isLoggedIn: (state) => !!state.authUser,
    isMutedTab: (state) => state.tab === 'muted',
    tabInvestors: (state, getters) =>
        state.investors.filter((i) =>
            getters.isMutedTab ? i.muted : !i.muted,
        ),
    tabCount: (_state, getters) => getters.tabInvestors.length,
}

export const mutations = {
    [SET_APPEARANCE](state, appearance) {
        state.appearance = appearance
    },
    [SET_ERROR](state, error) {
        state.error = error
    },
    [SET_INITIAL_DATA](state, { investors, profile, error }) {
        state.investors = investors
        state.profile = profile
        if (error) state.error = error
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
        state.error = null
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
    nuxtServerInit({ commit }, { app, route }) {
        const user = app.$cookies.get('user')
        if (user) {
            const decoded = jwt.verify(user, process.env.SECRET)
            commit(SET_USER, decoded)
            const tab = route.query?.tab
            if (tab) {
                commit(SET_TAB, tab)
            }
        }
        const appearance = app.$cookies.get('appearance')
        if (appearance) commit('SET_APPEARANCE', appearance)
    },
    async bootstrap({ commit }) {
        const {
            data,
            data: { profile },
        } = await this.$axios.$get('/api/users')
        const investors = data.investors.sort(followerSorter)
        commit(SET_INITIAL_DATA, {
            profile,
            investors,
            error: data.error,
        })
    },
    async mute({ commit, getters, state }, data) {
        try {
            if (state.error) commit(SET_ERROR, null)

            const { type, usernames, undo } = data

            if (type === 'destroy') {
                await this.$axios.$request({
                    url: '/api/mutes',
                    data: { usernames },
                    method: 'delete',
                })
            } else {
                await this.$axios.$post('/api/mutes', { usernames })
            }
            const investors = flipInvestors(
                state.investors,
                usernames,
                type === 'destroy' ? !getters.isMutedTab : getters.isMutedTab,
            )
            commit(SET_INVESTORS, investors)

            const undoType = type === 'destroy' ? 'create' : 'destroy'
            const undoAction = undo ? null : { type: undoType, usernames }
            commit(SET_UNDO_ACTION, undoAction)
        } catch (err) {
            const error = err.response?.data ?? {
                ...err,
                description: 'Sorry about that. This project was a quick hack.',
            }
            commit(SET_ERROR, error)
        }
    },
    async logOut({ commit }) {
        if (state.error) commit(SET_ERROR, null)
        await this.$axios.$post('/api/auth/logout')
        commit(SET_USER, null)
    },
}
