<template>
    <div>
        <template v-if="isLoggedIn">
            <div>@{{ authUser.username }}</div>
            <button @click="handleLogOut">
                Log out
            </button>
        </template>
        <template v-else>
            <div>
                Mute/block VC *thought leaders*
            </div>
            <a href="/auth/twitter">
                Continue with Twitter
            </a>
        </template>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState(['authUser']),
    },
    methods: {
        handleLogOut() {
            // Would prefer to use `mapActions`, but is broken for some reason
            this.$store.dispatch('logout')
        },
    },
}
</script>
