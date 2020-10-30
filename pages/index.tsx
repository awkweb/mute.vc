import { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/client'

import { Provider } from '@/store'
import { Dashboard, Home } from '@/components'
import { ApiError, User } from '@/declarations'
import getToken from '@/lib/get-token'
import Twitter from '@/lib/twitter'

type Props = {
    initialData: {
        user: User
        users: User[]
        mutes: User[] | ApiError
    }
}

const Page: NextPage<Props> = (props) => {
    const [session, loading] = useSession()
    if (loading) return <div />
    if (!session) return <Home />
    return (
        <Provider initialData={props.initialData}>
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
    const users = await twitter.getUsers()

    let mutes: User[] | ApiError
    try {
        mutes = await twitter.getMutes()
    } catch (err) {
        const message =
            err.statusCode === 429
                ? 'Twitter rate limit exceeded'
                : 'Something went wrong'
        mutes = {
            message,
        }
    }

    return { props: { initialData: { user, users, mutes } } }
}

export default Page
