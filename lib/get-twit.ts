import Twit from 'twit'

function getTwit(accessToken: string, accessTokenSecret: string): Twit {
    return new Twit({
        consumer_key: <string>process.env.NEXTAUTH_TWITTER_ID,
        consumer_secret: <string>process.env.NEXTAUTH_TWITTER_SECRET,
        access_token: accessToken,
        access_token_secret: accessTokenSecret,
    })
}

export default getTwit
