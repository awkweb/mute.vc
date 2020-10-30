import Layout from './layout'
import LoginButton from './login-button'

type Props = {}

const Home: React.FC<Props> = () => {
    return (
        <Layout>
            <LoginButton />
        </Layout>
    )
}

export default Home
