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
    user: User
    investors: Investor[]
}

const Page: NextPage<Props> = (props) => {
    const [session, loading] = useSession()
    if (!session && loading) return <div />
    if (!session) return <Home />

    return (
        <Provider investors={props.investors} user={props.user}>
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

    const users = await twitter.getUsers()
    const mutedIds = await twitter.getMutedIds()
    const investors = getInvestors(users, mutedIds, user.screenName)

    return { props: { user, investors } }
}

export default Page
