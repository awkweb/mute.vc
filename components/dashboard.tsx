import { signOut } from 'next-auth/client'

import { useStore } from '@/store'

import Layout from './layout'

type Props = {}

const Dashboard: React.FC<Props> = () => {
    const { user, investors } = useStore()
    console.log('user', user)
    console.log('investors', investors)
    return (
        <Layout>
            <div>{user.screenName}</div>
            <button onClick={() => signOut()}>Sign Out</button>
        </Layout>
    )
}

export default Dashboard
