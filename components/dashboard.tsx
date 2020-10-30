import { signOut } from 'next-auth/client'

import { User } from '@/declarations'

import Layout from './layout'

type Props = {
    user: User
    users: User[]
}

const Dashboard: React.FC<Props> = (props) => {
    return (
        <Layout>
            <div>{props.user && props.user.screenName}</div>
            <button onClick={() => signOut()}>Sign Out</button>
        </Layout>
    )
}

export default Dashboard
