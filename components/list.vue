<template>
    <ul class="md:min-h-list">
        <template v-if="tabInvestors.length">
            <Item
                v-for="investor in tabInvestors"
                :key="investor.id"
                :bio="investor.description"
                :image="investor.profileImageUrlHttps"
                :name="investor.name"
                :on="investor.on"
                :username="investor.username"
                :verified="investor.verified"
            />
        </template>
        <template v-else>
            <li
                class="flex flex-col justify-center items-center px-4 py-4 text-description"
                style="min-height: 30vh"
            >
                <component :is="placeholder.icon" v-bind="{ size: '22' }" />
                <div class="font-medium mt-2">
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
        ...mapState(['tab', 'isMutedTab']),
        placeholder() {
            return {
                text: `No ${this.tab} investors`,
                icon: this.isMutedTab ? VolumeXIcon : Volume2Icon,
            }
        },
    },
}
</script>
