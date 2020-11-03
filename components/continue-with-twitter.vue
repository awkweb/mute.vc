<template>
    <button
        class="
            bg-primary
            block
            flex
            font-semibold
            hover:bg-primary-dark
            hover:no-underline
            items-center
            justify-center
            max-w-button
            max-w-button
            mx-auto
            py-button
            relative
            rounded
            shadow-lg
            text-white
            w-full
        "
        @click="click"
    >
        Continue with Twitter
    </button>
</template>

<script>
export default {
    methods: {
        click() {
            window.location = '/auth'
        },
    },
}
</script>
