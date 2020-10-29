/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo } from 'react'
import NextLink from 'next/link'

type Props = {
    external?: boolean
    href: string
    as?: string
    passHref?: boolean
    children: React.ReactNode
    className?: string
}

const Link: React.FC<Props> = (props) => {
    const { external, href, as, passHref, children } = props
    if (external) {
        return (
            <a
                className={props.className}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
            >
                {children}
            </a>
        )
    }

    return (
        <NextLink as={as} href={href} passHref={passHref}>
            {passHref ? (
                children
            ) : (
                <a className={props.className}>{children}</a>
            )}
        </NextLink>
    )
}

export default memo(Link)
