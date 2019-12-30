<template>
    <button
        class="font-bold border-b-2 h-full mr-4 text-15"
        :class="activeClass"
        :disabled="active"
        @click="click"
    >
        {{ name | capitalize }}
    </button>
</template>

<script>
export default {
    props: {
        current: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    computed: {
        active() {
            return this.current === this.name
        },
        activeClass() {
            return this.active
                ? 'text-blue'
                : 'border-transparent text-gray-700'
        },
    },
    methods: {
        click() {
            this.$emit('select', this.name)
        },
    },
}
</script>
