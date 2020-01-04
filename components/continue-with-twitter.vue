<template>
    <a
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
        "
        href="/auth/twitter"
        @click="click"
    >
        Continue with Twitter
    </a>
</template>

<script>
export default {
    methods: {
        click() {
            window.sa('click_login')
        },
    },
}
</script>
