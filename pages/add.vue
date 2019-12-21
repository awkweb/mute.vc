<template>
    <div>
        <h1>Add Investor</h1>
        <form @submit="handleSubmit">
            <div>
                <label>Username</label>
                <input
                    v-model.trim="username"
                    :disabled="loading"
                    placeholder="username"
                />
            </div>
            <div>
                <label>Category</label>
                <select v-model="selected" :disabled="loading">
                    <option
                        v-for="option in options"
                        :key="option"
                        :value="option"
                    >
                        {{ option }}
                    </option>
                </select>
            </div>
            <div>
                <NuxtLink to="/">
                    Back
                </NuxtLink>
                <button :disabled="submitDisabled" type="submit">
                    {{ loading ? 'Adding...' : 'Add' }}
                </button>
            </div>
            <div v-if="error">
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
