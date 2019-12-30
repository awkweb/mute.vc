<template>
    <li class="bg-white border-b border-gray-300 px-4 py-2">
        <div class="flex">
            <img
                class="bg-light h-12 mr-3 mt-1 rounded-full w-full"
                style="max-width: 3rem;"
                :src="image | twitterImageUrl"
            />
            <div>
                <div class="leading-none">
                    <div class="leading-tight">
                        {{ name }}
                    </div>
                    <a
                        class="text-secondary inline-block text-sm"
                        :href="`https://twitter.com/${username}`"
                        target="_blank"
                        style="font-size: 0.8125rem;"
                    >
                        @{{ username }}
                    </a>
                </div>
                <!-- eslint-disable vue/no-v-html -->
                <div class="mt-2" v-html="linkedBio" />
                <!--eslint-enable-->
            </div>
        </div>
    </li>
</template>

<script>
import Autolinker from 'autolinker'

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
        username: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        linkedBio() {
            return Autolinker.link(this.bio, {
                hashtag: 'twitter',
                mention: 'twitter',
                truncate: 25,
            })
        },
    },
}
</script>
