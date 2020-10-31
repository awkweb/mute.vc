import { signin } from 'next-auth/client'

const LoginButton: React.FC = () => {
    return (
        <button onClick={() => signin('twitter')}>Continue with Twitter</button>
    )
}

export default LoginButton
