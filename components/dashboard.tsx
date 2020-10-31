import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'

import { useStore } from '@/store'

import Layout from './layout'
import List from './list'
import Nav from './nav'

const Dashboard: React.FC = () => {
    const { query } = useRouter()
    const { user, investors } = useStore()

    const tab = (query.tab as string) ?? 'unmuted'
    const title = `${tab[0].toUpperCase() + tab.substring(1)} (${
        investors.length
    })`

    return (
        <Layout title={title}>
            <Nav />
            <List investors={investors} />
            <div>{user.screenName}</div>
            <button onClick={() => signOut()}>Sign Out</button>
        </Layout>
    )
}

export default Dashboard
