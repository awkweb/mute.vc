<template>
    <div>
        <h1 class="font-semibold mb-5 mt-10">
            Add Investors
        </h1>
        <form class="max-w-sm">
            <div class="mb-4">
                <label class="block mb-1 text-sm">
                    Comma-separated Twitter usernames
                </label>
                <textarea
                    v-model.trim="usernames"
                    class="
                        block
                        border
                        border-solid
                        border-secondary
                        px-2
                        py-1
                        h-48
                        rounded
                        w-full
                    "
                    :disabled="loading"
                />
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
                :class="submitDisabled ? 'opacity-50 cursor-not-allowed' : ''"
                :disabled="submitDisabled"
                @click.prevent="handleSubmit"
                @keyup.enter="handleSubmit"
            >
                {{ loading ? 'Adding...' : buttonText }}
            </button>
            <div v-if="error" class="mt-5">
                {{ error }}
            </div>
            <div v-else-if="success" class="mt-5">
                <div>Success! Added:</div>
                <ul class="list-decimal pl-4">
                    <li v-for="s in success" :key="s.id">
                        <a :href="`https://twitter.com/${s.username}`">
                            {{ s.username }}
                        </a>
                    </li>
                </ul>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        error: null,
        loading: false,
        success: null,
        usernames: null,
    }),
    computed: {
        submitDisabled() {
            return this.loading || !this.usernames
        },
        usernamesList() {
            return this.usernames
                ?.split(',')
                .filter((u) => u !== '')
                .map((u) => u.trim())
        },
        usernamesListCount() {
            return this.usernamesList?.length ?? 0
        },
        buttonText() {
            if (this.usernamesListCount === 0) {
                return 'Add'
            } else if (this.usernamesListCount === 1) {
                return 'Add 1 investor'
            } else {
                return `Add ${this.usernamesListCount} investors`
            }
        },
    },
    middleware: 'auth',
    methods: {
        async handleSubmit(event) {
            event.preventDefault()
            try {
                this.error = null
                this.success = null
                this.loading = true
                const { data } = await this.$axios.$post('/api/investors', {
                    usernames: this.usernamesList,
                })
                this.selected = null
                this.usernames = null
                this.success = data
            } catch (err) {
                this.error = err
            } finally {
                this.loading = false
            }
        },
    },
    head: () => ({
        title: 'Add Investors',
    }),
}
</script>
