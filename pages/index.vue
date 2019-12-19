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
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
    async fetch({ store, params }) {
        await store.dispatch('me')
    },
}
</script>
