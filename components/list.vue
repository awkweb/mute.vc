<template>
    <ul style="min-height: calc(100vh - 7rem)">
        <template v-if="tabInvestors.length">
            <Item
                v-for="investor in tabInvestors"
                :key="investor.id"
                :bio="investor.description"
                :image="investor.profileImageUrlHttps"
                :name="investor.name"
                :username="investor.username"
                :verified="investor.verified"
            />
        </template>
        <template v-else>
            <li
                class="flex flex-col justify-center items-center px-4 py-4"
                style="min-height: 50vh"
            >
                <component
                    :is="placeholder.icon"
                    v-bind="{ size: '25', class: 'text-gray-700' }"
                />
                <div
                    class="
                        mt-2
                        text-gray-800
                        truncate
                    "
                >
                    {{ placeholder.text }}
                </div>
            </li>
        </template>
    </ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Volume2Icon, VolumeXIcon } from 'vue-feather-icons'
import Item from './item'

export default {
    components: {
        Item,
        Volume2Icon,
        VolumeXIcon,
    },
    computed: {
        ...mapGetters(['tabInvestors']),
        ...mapState(['tab']),
        placeholder() {
            return {
                text: `No ${this.tab} investors`,
                icon: this.tab === 'muted' ? VolumeXIcon : Volume2Icon,
            }
        },
    },
}
</script>
