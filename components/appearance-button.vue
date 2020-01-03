<template>
    <button
        class="
            bg-gray
            flex
            items-center
            justify-center
            rounded-full
            text-body
        "
        :class="classes"
        @click="click"
    >
        <component :is="appearanceIcon" v-bind="{ size: text ? '15' : '18' }" />
        <div v-if="text" class="ml-2 text-15">
            {{ appearance | capitalize }}
        </div>
    </button>
</template>

<script>
import { MoonIcon, SunIcon } from 'vue-feather-icons'
import { mapGetters, mapState } from 'vuex'

export default {
    props: {
        fixed: {
            type: Boolean,
            default: false,
        },
        text: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapGetters(['isDark']),
        ...mapState(['appearance']),
        appearanceIcon() {
            return this.isDark ? MoonIcon : SunIcon
        },
        fixedClasses() {
            if (this.fixed) {
                return [
                    'bottom-0',
                    'fixed',
                    'lg:bottom-auto',
                    'lg:hover:opacity-100',
                    'lg:mb-0',
                    'lg:mt-3',
                    'lg:opacity-50',
                    'lg:top-0',
                    'mb-2',
                    'mr-2',
                    'px-4',
                    'py-2',
                    'right-0',
                ]
            }
            return []
        },
        noTextClasses() {
            if (!this.text) {
                return [
                    'border',
                    'border-gray',
                    'hover:bg-gray-dark',
                    'hover:border-gray-dark',
                    'h-avatar',
                    'w-avatar',
                ]
            }
            return []
        },
        classes() {
            return [...this.fixedClasses, ...this.noTextClasses]
        },
    },
    methods: {
        click() {
            const appearance = this.isDark ? 'light' : 'dark'
            this.$store.commit('SET_APPEARANCE', appearance)
            this.$cookies.set('appearance', appearance, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            })
        },
    },
}
</script>
