import Head from './head'

type Props = {
    title?: string
    description?: string
    children: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {
    return (
        <>
            <Head description={props.description} title={props.title} />
            <main>{props.children}</main>
        </>
    )
}

export default Layout
