<template>
    <button
        class="
            cursor-pointer
            font-bold
            border-b-2
            flex-1
            h-full
            pt-3
            pb-3
            text-15
        "
        :class="activeClass"
        :disabled="active"
        @click="click"
    >
        {{ name | capitalize }}
    </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState(['tab']),
        active() {
            return this.tab === this.name
        },
        activeClass() {
            return this.active
                ? 'text-primary border-primary'
                : 'hover:bg-gray-light border-transparent text-description'
        },
    },
    methods: {
        click() {
            window.sa(`click_tab_${this.name}`)
            this.$router.push({ path: '/', query: { tab: this.name } })
        },
    },
}
</script>
