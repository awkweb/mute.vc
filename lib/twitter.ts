import Twit from 'twit'

import { PromiseResponse, Token, User } from '@/declarations'

import cleanTwitterUser from './clean-twitter-user'

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

    async me(): Promise<User> {
        const { data } = <PromiseResponse<Twit.Twitter.User>>(
            await this.client.get('account/verify_credentials', {
                include_entities: false,
                include_email: true,
                skip_status: true,
            })
        )
        return cleanTwitterUser(data)
    }

    async getUsers(): Promise<User[]> {
        const { data } = <PromiseResponse<{ users: Twit.Twitter.User[] }>>(
            await this.client.get('lists/members', {
                slug: process.env.TWITTER_LIST_SLUG,
                owner_screen_name: process.env.TWITTER_LIST_OWNER,
                count: 5000,
                include_entities: false,
                skip_status: true,
            })
        )
        return data.users.map((x) => cleanTwitterUser(x))
    }

    async getMutes(): Promise<User[]> {
        const { data } = <PromiseResponse<{ users: Twit.Twitter.User[] }>>(
            await this.client.get('mutes/users/list', {
                include_entities: false,
                skip_status: true,
            })
        )
        return data.users.map((x) => cleanTwitterUser(x))
    }
}

export default Twitter
