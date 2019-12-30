<template>
    <li>
        <div class="flex">
            <img
                class="bg-light h-10 mr-3 mt-1 rounded-full w-10"
                :src="image"
            />
            <div class="leading-none">
                <div class="leading-tight truncate" style="max-width: 10rem;">
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
        </div>
        <!-- eslint-disable vue/no-v-html -->
        <div
            class="max-w-xs overflow-hidden text-sm truncate"
            v-html="linkedBio"
        />
        <!--eslint-enable-->
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
