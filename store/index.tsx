import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'

import { Investor, User } from '@/declarations'

type State = {
    user: User
    investors: Investor[]
}

type Props = {
    children: React.ReactNode
    error?: Error
    investors: Investor[]
    user: User
}
const Context = createContext<Partial<State>>({})

const Provider: React.FC<Props> = (props) => {
    const { user } = props
    const { query } = useRouter()
    const tab = (query.tab as string) ?? 'unmuted'

    const investors = props.investors.filter((x) =>
        tab === 'muted' ? x.muted : !x.muted,
    )

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
