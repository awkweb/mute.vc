import Twit from 'twit'
import { camelize } from '@ridi/object-case-converter'

import { PromiseResponse, Token, User } from '@/declarations'

const camelizeUser = (data: Twit.Twitter.User): User =>
    camelize(data, {
        recursive: true,
    })

class Twitter {
    client: Twit

    constructor(token: Token) {
        this.client = new Twit({
            consumer_key: <string>process.env.NEXTAUTH_TWITTER_ID,
            consumer_secret: <string>process.env.NEXTAUTH_TWITTER_SECRET,
            access_token: token.accessToken,
            access_token_secret: token.accessTokenSecret,
        })
    }

    async me() {
        const { data } = <PromiseResponse<Twit.Twitter.User>>(
            await this.client.get('account/verify_credentials', {
                include_entities: false,
                include_email: true,
                skip_status: true,
            })
        )
        return camelizeUser(data)
    }

    async getUsers() {
        const { data } = <PromiseResponse<{ users: Twit.Twitter.User[] }>>(
            await this.client.get('lists/members', {
                slug: process.env.TWITTER_LIST_SLUG,
                owner_screen_name: process.env.TWITTER_LIST_OWNER,
                count: 5000,
                include_entities: false,
                skip_status: true,
            })
        )
        return data.users.map((x) => camelizeUser(x))
    }

    async getMutedIds() {
        const { data } = <PromiseResponse<{ ids: number[] }>>(
            await this.client.get('mutes/users/ids')
        )
        return data.ids
    }

    async createMutes(screenNames: string[]) {
        const promises = screenNames.map((x) =>
            this.client.get('mutes/users/create', {
                screen_name: x,
            }),
        )
        return await Promise.all(promises)
    }

    async destroyMutes(screenNames: string[]) {
        const promises = screenNames.map((x) =>
            this.client.get('mutes/users/destroy', {
                screen_name: x,
            }),
        )
        return await Promise.all(promises)
    }
}

export default Twitter
