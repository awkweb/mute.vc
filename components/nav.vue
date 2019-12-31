<template>
    <div
        class="
            bg-white
            border-b
            border-gray-400
            flex
            md:pt-3
            pt-2
            sticky
            top-0
        "
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
    computed: {
        ...mapState(['tab']),
    },
}
</script>
