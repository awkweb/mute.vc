import { NextPage } from 'next'

import { Layout } from '@/components'

type Props = {}

const Page: NextPage<Props> = () => {
    const title = 'Page Not Found'
    return (
        <Layout title={title}>
            <h1>{title}</h1>
        </Layout>
    )
}

export default Page
