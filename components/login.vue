<template>
    <div>
        <header class="container mb-48 mt-32 text-center">
            <h1 class="font-bold mb-6 text-body text-headline">
                Mute investors on Twitter
            </h1>
            <div
                class="
                    leading-relaxed 
                    max-w-xs 
                    mb-7
                    mx-auto 
                    text-xl 
                    text-secondary
                "
            >
                Silence VC thought leadership and platitudes from your feed
            </div>
            <a
                class="
                    bg-twitter
                    block
                    flex
                    font-semibold
                    items-center
                    justify-center
                    max-w-button
                    mx-auto
                    no-underline
                    relative
                    rounded
                    text-background
                    text-base
                "
                href="/auth/twitter"
                style="padding-bottom: 0.625rem; padding-top: 0.625rem;"
            >
                Continue with Twitter
            </a>
        </header>

        <section
            class="
                container
                flex
                justify-around
                max-w-5xl
                mx-auto
                px-4
            "
            style="margin-bottom: 7.65rem;"
        >
            <div
                v-for="reason in reasons"
                :key="reason.id"
                class="max-w-reason"
            >
                <div
                    class="
                        bg-light
                        flex
                        items-center
                        justify-center
                        mb-5
                        rounded-full
                        text-body
                    "
                    style="height: 3.25rem; width: 3.25rem;"
                >
                    <RadioIcon v-if="reason.icon === 'radio'" size="23" />
                    <ZapIcon v-else-if="reason.icon === 'zap'" size="22" />
                    <ClockIcon v-else-if="reason.icon === 'clock'" size="22" />
                </div>
                <h4 class="font-bold mb-3 text-body text-lg">
                    {{ reason.title }}
                </h4>
                <p
                    class="leading-normal text-secondary"
                    style="font-size: 1.0625rem;"
                >
                    {{ reason.description }}
                </p>
            </div>
        </section>

        <footer class="bg-footer border-edge border-t h-24">
            <div
                class="
                    flex
                    h-full
                    items-center
                    justify-between
                    max-w-5xl
                    mx-auto
                    px-4
                "
            >
                <div class="text-secondary text-sm">
                    Designed in New York City.
                </div>
                <ul class="flex">
                    <li>
                        <a
                            class="no-underline text-secondary text-sm"
                            href="https://watsi.org/"
                        >
                            Donate
                        </a>
                    </li>
                    <li class="ml-10">
                        <a
                            class="no-underline text-secondary text-sm"
                            href="mailto:tom@meagher.co"
                        >
                            Contact
                        </a>
                    </li>
                    <li class="ml-10">
                        <a
                            class="no-underline text-secondary text-sm"
                            href="https://twitter.com/tomfme"
                        >
                            Twitter
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    </div>
</template>

<script>
import { ClockIcon, RadioIcon, ZapIcon } from 'vue-feather-icons'

export default {
    components: {
        ClockIcon,
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
                    'Less investor tweets means less content to see and more time to do literally anything else.',
            },
        ],
    }),
}
</script>
