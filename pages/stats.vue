<template>
    <client-only>
        <div class="min-h-screen pt-4 px-4">
            <div class="md:max-w-xl md:mx-auto">
                <p>
                    This website has <span id="pageviews"></span> page views in
                    the last month.
                </p>
                <div
                    data-sa-graph-url="https://simpleanalytics.com/mute.vc?color=75b5aa"
                    data-sa-page-views-selector="#pageviews"
                >
                    <p>
                        Ad blockers don't like the Simple Analytics embed,
                        disable yours to view this graph.
                    </p>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script>
export default {
    head() {
        return {
            script: [
                {
                    src: 'https://cdn.simpleanalytics.io/embed.js',
                    body: true,
                },
            ],
        }
    },
}
</script>
