import { NextPage } from 'next'

import { Layout, Link } from '@/components'

type Props = {}

const Page: NextPage<Props> = () => {
    const title = 'Page Not Found'
    return (
        <Layout title={title}>
            <h1>{title}</h1>
            <Link href="/">Back to home</Link>
        </Layout>
    )
}

export default Page
