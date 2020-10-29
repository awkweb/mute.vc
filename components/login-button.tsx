import { signin } from 'next-auth/client'

type Props = {}

const LoginButton: React.FC<Props> = () => {
    return (
        <button onClick={() => signin('twitter')}>Continue with Twitter</button>
    )
}

export default LoginButton
