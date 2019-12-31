<template>
    <Dashboard v-if="isLoggedIn" />
    <Home v-else />
</template>

<script>
import { mapGetters } from 'vuex'
import Dashboard from '@/components/dashboard'
import Home from '@/components/home'

export default {
    components: {
        Dashboard,
        Home,
    },
    async fetch({ store, params }) {
        if (store.getters.isLoggedIn) {
            await store.dispatch('bootstrap')
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
}
</script>
