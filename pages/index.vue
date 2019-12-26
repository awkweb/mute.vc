<template>
    <div>
        <template v-if="isLoggedIn">
            <Dashboard />
        </template>
        <template v-else>
            <Login />
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dashboard from '@/components/dashboard'
import Login from '@/components/login'

export default {
    components: {
        Dashboard,
        Login,
    },
    async fetch({ store, params }) {
        if (store.getters.isLoggedIn) {
            await store.dispatch('bootstrap')
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
    head() {
        return {
            title: this.isLoggedIn ? 'Dashboard' : 'Mute investors on Twitter',
        }
    },
}
</script>
