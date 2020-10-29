import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/client'

import { Layout, LoginButton } from '@/components'

type Props = {}

const Page: NextPage<Props> = (_props) => {
    const [session, loading] = useSession()

    if (loading) return <div />
    return (
        <Layout>
            {!session ? (
                <LoginButton />
            ) : (
                <>
                    <div>{session.user.username}</div>
                    <button onClick={() => signOut()}>Sign Out</button>
                </>
            )}
        </Layout>
    )
}

export default Page
