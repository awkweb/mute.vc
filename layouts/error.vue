<template>
    <div class="min-h-screen pt-4 px-4">
        <div class="md:max-w-xl md:mx-auto">
            <h1 class="text-body">
                {{
                    error.statusCode === 404
                        ? 'Page not found :('
                        : 'An error occurred'
                }}
            </h1>
            <nuxt-link class="text-description" to="/">
                Back to home
            </nuxt-link>
        </div>
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
