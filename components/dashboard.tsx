import { signOut } from 'next-auth/client'

import { useStore } from '@/store'

import Layout from './layout'

const Dashboard: React.FC = () => {
    const { user } = useStore()
    return (
        <Layout>
            <div>{user.screenName}</div>
            <button onClick={() => signOut()}>Sign Out</button>
        </Layout>
    )
}

export default Dashboard
