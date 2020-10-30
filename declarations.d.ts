import { SessionBase as AuthSession, User as AuthUser } from 'next-auth'

type Session = AuthSession | { user: User }
interface Token extends AuthUser {
    accessToken: string
    accessTokenSecret: string
    userId: string
    username: string
}

interface User {
    contributorsEnabled: boolean
    createdAt: string
    defaultProfile: string
    defaultProfileImage: string
    description: string
    entities: Entities
    favouritesCount: number
    followRequestSent?: boolean
    following?: boolean
    followersCount: number
    friendsCount: number
    geoEnabled?: boolean
    id: number
    idStr: string
    isTranslator?: boolean
    lang: string
    listedCount: number
    location: string
    name: string
    notifications?: boolean
    profileBackgroundColor: string
    profileBackgroundImageUrl: string
    profileBackgroundImageUrlHttps: string
    profileBackgroundTile: boolean
    profileBannerUrl: string
    profileImageUrl: string
    profileImageUrlHttps: string
    profileLinkColor: string
    profileSidebarBorderColor: string
    profileSidebarFillColor: string
    profileTextColor: string
    profileUseBackgroundImage: boolean
    protected: boolean
    screenName: string
    showAllInlineMedia: boolean
    status?: Status
    statusesCount: number
    timeZone?: string
    url: string
    utcOffset?: number
    verified: boolean
    withheldInCountries: string
    withheldScope: string
}
