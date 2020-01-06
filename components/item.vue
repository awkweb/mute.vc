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
                class="bg-gray-dark h-12 mr-3 mt-1 overflow-hidden rounded-full w-full"
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
                            <div v-if="verified">
                                <svg
                                    class="fill-current select-none text-verified"
                                    viewBox="0 0 24 24"
                                    aria-label="Verified account"
                                    style="height: 1.171875rem; margin-left: 2px;"
                                >
                                    <g>
                                        <path
                                            d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
                                        />
                                    </g>
                                </svg>
                            </div>
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

export default {
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
                window.sa(`click_${type}`)
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
