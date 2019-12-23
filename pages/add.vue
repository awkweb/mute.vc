<template>
    <div class="container">
        <div class="mb-5 mt-10">
            <h1 class="font-medium">Add Investor</h1>
            <NuxtLink class="text-secondary text-sm underline" to="/">
                Back to home
            </NuxtLink>
        </div>
        <form class="max-w-sm">
            <div class="mb-4">
                <label class="block mb-1 text-sm">Username</label>
                <input
                    v-model.trim="username"
                    class="
                        block
                        border
                        border-solid
                        border-secondary
                        px-2
                        h-8
                        rounded
                        w-full
                    "
                    :disabled="loading"
                />
            </div>
            <div class="mb-4">
                <label class="block mb-1 text-sm">Category</label>
                <select
                    v-model="selected"
                    class="
                        block
                        border
                        border-solid
                        border-secondary
                        placeholder-secondary
                        px-2
                        h-8
                        rounded
                        w-full
                    "
                    :disabled="loading"
                >
                    <option
                        v-for="option in options"
                        :key="option"
                        :value="option"
                    >
                        {{ option }}
                    </option>
                </select>
            </div>
            <button
                class="
                    bg-body
                    font-semibold
                    px-5
                    py-2
                    rounded
                    text-background
                    text-sm
                "
                :disabled="submitDisabled"
                @click.prevent="handleSubmit"
                @keyup.enter="handleSubmit"
            >
                {{ loading ? 'Adding...' : 'Add' }}
            </button>
            <div v-if="error" class="mt-4">
                {{ error }}
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        error: null,
        loading: false,
        options: ['angel', 'ex', 'micro', 'professional'],
        selected: null,
        username: null,
    }),
    computed: {
        submitDisabled() {
            return this.loading || !this.username || !this.selected
        },
    },
    middleware: 'auth',
    methods: {
        async handleSubmit(event) {
            event.preventDefault()
            try {
                this.error = null
                this.loading = true
                await this.$axios.$post('/api/investors', {
                    category: this.selected,
                    username: this.username,
                })
                this.selected = null
                this.username = null
            } catch (err) {
                this.error = err
            } finally {
                this.loading = false
            }
        },
    },
}
</script>
