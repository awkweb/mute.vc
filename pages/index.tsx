import { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/client'
import useSWR from 'swr'

import { Dashboard, Home } from '@/components'
import { User } from '@/declarations'
import getToken from '@/lib/get-token'
import Twitter from '@/lib/twitter'

type Props = {
    initialData?: {
        user?: User
        users?: User[]
    }
}

const Page: NextPage<Props> = (props) => {
    const [session, loading] = useSession()
    const { data: user } = useSWR<User>(
        () => (session ? '/api/users/credentials' : null),
        {
            initialData: props.initialData?.user,
        },
    )
    const { data: users } = useSWR<User[]>(
        () => (session ? '/api/users' : null),
        {
            initialData: props.initialData?.users,
        },
    )

    if (loading) return <div />
    if (!session || !user) return <Home />
    return <Dashboard user={user} users={users} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) return { props: {} }

    const token = await getToken(context.req)
    const twitter = new Twitter(token)
    const user = await twitter.me()
    const users = await twitter.getUsers()
    return { props: { initialData: { user, users } } }
}

export default Page
