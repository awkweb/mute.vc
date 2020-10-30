import Twit from 'twit'

import { Token, User } from '@/declarations'

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
        const { data } = await this.client.get('account/verify_credentials', {
            include_entities: false,
            include_email: true,
            skip_status: true,
        })
        return cleanTwitterUser(<Twit.Twitter.User>data)
    }

    async getUsers(): Promise<User[]> {
        const { data } = await this.client.get('lists/members', {
            slug: process.env.TWITTER_LIST_SLUG,
            owner_screen_name: process.env.TWITTER_LIST_OWNER,
            count: 5000,
            include_entities: false,
            skip_status: true,
        })
        return data.users.map((x: Twit.Twitter.User) => cleanTwitterUser(x))
    }
}

export default Twitter
