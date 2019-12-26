<template>
    <div class="mt-10">
        <h1>
            {{
                error.statusCode === 404
                    ? 'Page not found'
                    : 'An error occurred'
            }}
        </h1>
        <nuxt-link class="mb-5 text-sm text-secondary" to="/">
            Back to home
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            required: true,
        },
    },
}
</script>
