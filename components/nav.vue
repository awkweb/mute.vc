<template>
    <div
        class="
            bg-white
            border-b
            border-gray-300
            flex
            sticky
            top-0
        "
        :style="{
            boxShadow: shadow ? '0 3px 6px -3px rgba(0, 0, 0, 0.15)' : '',
        }"
    >
        <Tab name="unmuted" />
        <Tab name="muted" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Tab from './tab'

export default {
    components: {
        Tab,
    },
    props: {
        shadow: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState(['tab']),
    },
}
</script>
