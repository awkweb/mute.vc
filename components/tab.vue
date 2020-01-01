<template>
    <button
        class="
            cursor-pointer
            font-bold
            border-b-2
            flex-1
            h-full
            pb-2
            pt-2
            md:pt-3
            md:pb-3
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
                ? 'text-blue'
                : 'hover:bg-gray-100 border-transparent text-gray-700'
        },
    },
    methods: {
        click() {
            this.$router.push({ path: '/', query: { tab: this.name } })
        },
    },
}
</script>
