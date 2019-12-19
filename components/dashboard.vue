<template>
    <div>
        <div>{{ profile.name }}</div>
        <div>@{{ authUser.username }}</div>
        <button @click="handleLogOut">
            Log out
        </button>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState(['authUser', 'profile']),
    },
    methods: {
        handleLogOut() {
            // Would prefer to use `mapActions`, but is broken for some reason :(
            this.$store.dispatch('logout')
        },
    },
}
</script>
