import { NextPage } from 'next'

import { Layout } from '@/components'

interface Props {
    status?: number | null
}

const Error: NextPage<Props> = (_props) => {
    const title = 'Something went wrong'
    return (
        <Layout title={title}>
            <h1>{title}</h1>
            <p>An error occurred.</p>
        </Layout>
    )
}

Error.getInitialProps = async (context) => {
    const { res, err } = context
    const status = res ? res.statusCode : err ? err.statusCode : null
    return { status }
}

export default Error
