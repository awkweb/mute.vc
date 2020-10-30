import { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/client'
import useSWR from 'swr'

import { Dashboard, Home } from '@/components'
import { User } from '@/declarations'

import { getUser } from './api/users/credentials'

type Props = {
    initialData?: {
        user?: User
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

    if (loading) return <div />
    if (!session || !user) return <Home />
    return <Dashboard user={user} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) return { props: {} }

    const user = await getUser(context.req)
    return { props: { initialData: { user } } }
}

export default Page
