import NavTab from './nav-tab'

const Nav: React.FC = () => {
    return (
        <nav
            className="
                bg-background
                border-b
                flex
                sticky
                top-0
            "
        >
            <NavTab name="unmuted" />
            <NavTab name="muted" />
        </nav>
    )
}

export default Nav
