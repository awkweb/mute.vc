import { createContext, useContext } from 'react'

import { User } from '@/declarations'

type State = {
    user: User
    investors: User[]
}

type Props = {
    children: React.ReactNode
    user: User
    investors: User[]
}
const Context = createContext<Partial<State>>({})

const Provider = (props: Props) => {
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
