import { signOut } from 'next-auth/client'

import { useStore } from '@/store'

import Layout from './layout'

type Props = {}

const Dashboard: React.FC<Props> = () => {
    const { user, users, mutes } = useStore()
    console.log('user', user)
    console.log('users', users)
    console.log('mutes', mutes)
    return (
        <Layout>
            <div>{user.screenName}</div>
            <button onClick={() => signOut()}>Sign Out</button>
        </Layout>
    )
}

export default Dashboard
