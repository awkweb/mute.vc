import { createContext, useContext } from 'react'
import useSWR from 'swr'

import { ApiError, User } from '@/declarations'

type State = {
    user: User
    users: User[]
    mutes: User[] | ApiError
}

type Props = {
    children: React.ReactNode
    initialData: State
}
const Context = createContext<Partial<State>>({})

const Provider = (props: Props) => {
    const { initialData } = props
    const { data: user } = useSWR<User>('/api/users/credentials', {
        initialData: initialData.user,
    })
    const { data: users } = useSWR<User[]>('/api/users', {
        initialData: initialData.users,
    })
    const { data: mutes } = useSWR<User[] | ApiError>('/api/mutes', {
        initialData: (initialData.mutes as User[]).length
            ? initialData.mutes
            : undefined,
    })

    return (
        <Context.Provider value={{ user, users, mutes }}>
            {props.children}
        </Context.Provider>
    )
}

const Consumer = Context.Consumer

function useStore() {
    return useContext(Context) as State
}

export default Context
export { Consumer, Provider, useStore }
