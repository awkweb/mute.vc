<template>
    <div
        class="
            bg-background
            border-b
            flex
            sticky
            top-0
        "
        :class="{ 'shadow-top': shadow }"
        style="transition: box-shadow 0.5s;"
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
