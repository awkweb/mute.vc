<template>
    <div class="container lg:mb-48 mb-24 lg:pt-40 pt-20 text-center">
        <h1 class="mb-2 text-body">
            {{
                error.statusCode === 404
                    ? 'Page not found :('
                    : 'An error occurred'
            }}
        </h1>
        <nuxt-link class="text-15 text-description" to="/">
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
