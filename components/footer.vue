<template>
    <footer
        class="
            absolute
            bottom-0
            inset-x-0
            bg-gray-light
            border-t
            lg:h-24
        "
    >
        <div
            class="
                flex
                flex-col
                h-full
                lg:flex-row
                lg:items-center
                lg:justify-between
                lg:py-4
                max-w-5xl
                mx-auto
                pb-10
                pt-8
                px-5
                "
        >
            <div
                class="
                    lg:mb-0
                    lg:order-first
                    lg:text-sm
                    order-last
                    text-description
                "
            >
                Designed in New York City
            </div>
            <ul class="flex flex-col lg:flex-row">
                <li
                    v-for="link in links"
                    :key="link.text"
                    class="mb-4 lg:mb-0 lg:ml-6"
                >
                    <a
                        class="underline lg:no-underline text-description lg:text-sm"
                        :href="link.href"
                        target="_blank"
                        @click="click(link.text.toLowerCase())"
                    >
                        {{ link.text }}
                    </a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
    data: () => ({
        links: [
            { text: 'Contact', href: 'mailto:tom@meagher.co?subject=mute.vc' },
            { text: 'Twitter', href: 'https://twitter.com/awkweb' },
            { text: 'GitHub', href: 'https://github.com/tmm/mute.vc' },
        ],
    }),
    methods: {
        click(link) {
            window.sa(`click_footer_${link}`)
        },
    },
}
</script>
