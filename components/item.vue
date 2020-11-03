<template>
    <li
        class="
            bg-background
            border-b
            md:hover:bg-gray-light
            md:px-4
            px-3
            py-2
        "
    >
        <div class="flex">
            <a
                class="
                    bg-gray-dark
                    h-12
                    mr-3
                    mt-1
                    overflow-hidden
                    rounded-full
                    w-full
                "
                style="max-width: 3rem;"
                :href="`https://twitter.com/${username}`"
                target="_blank"
            >
                <img :src="image | twitterImageUrl" />
            </a>
            <div class="overflow-hidden w-full" style="padding-top: 0.35rem;">
                <div class="flex justify-between items-start">
                    <div class="leading-none max-w-full mr-2 overflow-hidden">
                        <div class="flex items-center">
                            <div
                                class="
                                    leading-normal
                                    text-title
                                    truncate
                                    font-bold
                                    text-15
                                "
                            >
                                {{ name }}
                            </div>
                            <VerifiedBadge v-if="verified" />
                        </div>
                        <a
                            class="text-description text-15"
                            :href="`https://twitter.com/${username}`"
                            target="_blank"
                            style="line-height: 1.1;"
                        >
                            @{{ username }}
                        </a>
                    </div>
                    <button
                        :disabled="loading"
                        class="
                            border
                            border-primary
                            disabled:pointer-events-none
                            focus:shadow-outline
                            font-bold
                            outline-none
                            px-4
                            py-1
                            rounded-full
                            text-15
                            text-white
                        "
                        style="margin-right: 3px;"
                        :class="classes"
                        @click="click"
                    >
                        {{ actionText }}
                    </button>
                </div>
                <!-- eslint-disable vue/no-v-html -->
                <div class="leading-snug mt-2 text-15" v-html="linkedBio" />
                <!--eslint-enable-->
            </div>
        </div>
    </li>
</template>

<script>
import Autolinker from 'autolinker'
import { mapState, mapGetters } from 'vuex'
import VerifiedBadge from './verified-badge'

export default {
    components: {
        VerifiedBadge,
    },
    props: {
        bio: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        on: {
            type: Boolean,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({ loading: false }),
    computed: {
        ...mapGetters(['isMutedTab']),
        ...mapState(['appearance', 'tab']),
        linkedBio() {
            return Autolinker.link(this.bio, {
                hashtag: 'twitter',
                mention: 'twitter',
                truncate: 25,
            })
        },
        actionText() {
            if (this.isMutedTab) {
                return this.on ? 'Unmute' : 'Mute'
            }
            return this.on ? 'Mute' : 'Unmute'
        },
        classes() {
            if (this.on) {
                return ['bg-primary', 'md:hover:bg-red', 'md:hover:border-red']
            } else {
                return [
                    'bg-background',
                    'md:hover:bg-gray-light',
                    'text-primary',
                ]
            }
        },
    },
    methods: {
        async click() {
            try {
                this.loading = true
                const type =
                    (this.on && !this.isMutedTab) ||
                    (!this.on && this.isMutedTab)
                        ? 'create'
                        : 'destroy'
                const data = {
                    type,
                    usernames: [this.username],
                    undo: true,
                }
                await this.$store.dispatch('mute', data)
            } finally {
                this.loading = false
            }
        },
    },
}
</script>
