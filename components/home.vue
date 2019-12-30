<template>
    <div>
        <header class="container lg:mb-48 mb-24 lg:mt-32 mt-20 text-center">
            <h1 class="font-bold mb-6 text-black" style="font-size: 2.125rem;">
                Mute investors on Twitter
            </h1>
            <div
                class="
                    leading-relaxed 
                    max-w-xs 
                    mb-7
                    mx-auto 
                    text-xl 
                    text-gray-700
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
                "
            >
                <div
                    class="
                        bg-gray-200
                        flex
                        items-center
                        justify-center
                        mb-5
                        rounded-full
                        text-gray-900
                    "
                    style="height: 3.25rem; width: 3.25rem;"
                >
                    <RadioIcon v-if="reason.icon === 'radio'" size="23" />
                    <ZapIcon v-else-if="reason.icon === 'zap'" size="22" />
                    <ClockIcon v-else-if="reason.icon === 'clock'" size="22" />
                </div>
                <h4 class="font-bold mb-3 text-gray-900 text-lg">
                    {{ reason.title }}
                </h4>
                <p
                    class="leading-normal text-gray-700"
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
import ContinueWithTwitter from './continue-with-twitter'
import Footer from './footer'

export default {
    components: {
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
                icon: 'radio',
                title: 'Cut through noise',
                description:
                    'Builders spend more time building and less time tweeting — don’t miss their tweets in a jumble of nonsense.',
            },
            {
                id: 2,
                icon: 'zap',
                title: 'Built for speed',
                description:
                    'Blazing fast mute and unmute so you can switch on and off investor chatter whenever you’d like.',
            },
            {
                id: 3,
                icon: 'clock',
                title: 'More quality time',
                description:
                    'Less investor tweets means less content to consume and more time to do literally anything else.',
            },
        ],
    }),
}
</script>
