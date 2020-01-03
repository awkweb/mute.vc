<template>
    <div>
        <AppearanceButton fixed text />

        <header class="container lg:mb-48 mb-24 lg:pt-40 pt-20 text-center">
            <h1
                class="font-bold max-w-headline mx-auto lg:max-w-full mb-6 text-body"
                style="font-size: 2.125rem;"
            >
                Mute investors on Twitter
            </h1>
            <div
                class="
                    leading-relaxed 
                    max-w-xs 
                    mb-7
                    mx-auto 
                    text-xl 
                    text-description
                "
            >
                Silence VC thought leadership and platitudes from your feed
            </div>
            <ContinueWithTwitter />
        </header>

        <section
            class="
                container
                flex
                flex-col
                justify-around
                max-w-5xl
                items-center
                lg:flex-row
                lg:mb-32
                mb-16
                mx-auto
                px-4
            "
        >
            <div
                v-for="reason in reasons"
                :key="reason.id"
                class="
                    lg:max-w-xxs
                    lg:mb-0
                    max-w-sm
                    mb-16
                    lg:px-0
                    px-1
                "
            >
                <div
                    class="
                        bg-gray-light
                        flex
                        items-center
                        justify-center
                        mb-5
                        rounded-full
                        text-title
                        shadow
                    "
                    style="height: 3.25rem; width: 3.25rem;"
                >
                    <component
                        :is="reason.icon.component"
                        v-bind="{ size: reason.icon.size }"
                    />
                </div>
                <h4 class="font-bold mb-3 text-title text-lg">
                    {{ reason.title }}
                </h4>
                <p
                    class="leading-normal text-description"
                    style="font-size: 1.0625rem;"
                >
                    {{ reason.description }}
                </p>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script>
import { ClockIcon, RadioIcon, ZapIcon } from 'vue-feather-icons'
import AppearanceButton from './appearance-button'
import ContinueWithTwitter from './continue-with-twitter'
import Footer from './footer'

export default {
    scrollToTop: true,
    components: {
        AppearanceButton,
        ClockIcon,
        ContinueWithTwitter,
        Footer,
        RadioIcon,
        ZapIcon,
    },
    data: () => ({
        reasons: [
            {
                id: 1,
                icon: {
                    component: RadioIcon,
                    size: '23',
                },
                title: 'Cut through noise',
                description:
                    'Builders spend more time building and less time tweeting — don’t miss their tweets in a jumble of nonsense.',
            },
            {
                id: 2,
                icon: {
                    component: ZapIcon,
                    size: '22',
                },
                title: 'Built for speed',
                description:
                    'Blazing fast mute and unmute so you can switch on and off investor chatter whenever you’d like.',
            },
            {
                id: 3,
                icon: {
                    component: ClockIcon,
                    size: '22',
                },
                title: 'More quality time',
                description:
                    'Less investor tweets means less content to consume and more time to do literally anything else.',
            },
        ],
    }),
    head: {
        title: 'Mute investors on Twitter',
    },
}
</script>
