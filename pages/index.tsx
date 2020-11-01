import { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/client'

import { Provider } from '@/store'
import { Dashboard, Home } from '@/components'
import { Investor, User } from '@/declarations'
import getToken from '@/lib/get-token'
import Twitter from '@/lib/twitter'
import getDatabase from '@/lib/get-database'
import getInvestors from '@/lib/get-investors'

type Props = {
    error?: Error
    investors: Investor[]
    user: User
}

const Page: NextPage<Props> = (props) => {
    const [session, loading] = useSession()
    if ((!session && loading) || session === null) return <div />
    if (!session) return <Home />

    return (
        <Provider
            error={props.error}
            investors={props.investors}
            user={props.user}
        >
            <Dashboard />
        </Provider>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) return { props: {} }

    const token = await getToken(context.req)
    const twitter = new Twitter(token)

    const user = await twitter.me()
    const db = getDatabase()
    await db.collection('users').doc(user.screenName).set(user, { merge: true })

    let error: Error | null = null
    let mutedIds: number[] = []
    try {
        mutedIds = await twitter.getMutedIds()
    } catch (err) {
        error =
            err.statusCode === 429
                ? {
                      name: 'Twitter rate limit exceeded',
                      message: 'Mutes may not show up for 15m.',
                  }
                : {
                      name: 'Something went wrong',
                      message: err.message,
                  }
    }

    const users = await twitter.getUsers()
    const investors = getInvestors(users, mutedIds, user.screenName)

    return { props: { user, investors, error } }
}

export default Page
