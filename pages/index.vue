<template>
    <div class="container">
        <template v-if="isLoggedIn">
            <Dashboard />
        </template>
        <template v-else>
            <Login />
        </template>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Dashboard from '@/components/dashboard'
import Login from '@/components/login'

export default {
    components: {
        Dashboard,
        Login,
    },
    async fetch({ store, params }) {
        await store.dispatch('bootstrap')
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState(['authUser']),
    },
}
</script>
