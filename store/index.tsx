import { createContext, useContext } from 'react'

import { User } from '@/declarations'

type State = {
    user: User
    investors: User[]
}

type Props = {
    children: React.ReactNode
    error?: Error
    investors: User[]
    user: User
}
const Context = createContext<Partial<State>>({})

const Provider: React.FC<Props> = (props) => {
    const { user, investors } = props
    return (
        <Context.Provider value={{ user, investors }}>
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
