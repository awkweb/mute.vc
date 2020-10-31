import NextHead from 'next/head'

type Props = {
    title?: string
    description?: string
}

const Head: React.FC<Props> = (props) => {
    const {
        title = 'Mute investors on Twitter',
        description = 'Remove VC thought leadership and platitudes from your feed.',
    } = props

    const url = 'https://mute.vc'
    const ogImage = `${url}/og.png`

    return (
        <NextHead>
            <meta content="en" httpEquiv="Content-Language" />
            <meta
                content="width=device-width, initial-scale=1.0"
                name="viewport"
            />

            <title>{title}</title>
            <meta content={description} name="description" />

            <meta content={title} name="og:title" />
            <meta content={description} name="og:description" />
            <meta content={url} name="og:url" />
            <meta content={ogImage} name="og:image" />
            <meta content="website" name="og:type" />

            <meta content={ogImage} name="twitter:image" />
            <meta content="summary_large_image" name="twitter:card" />
            <meta content="@awkweb" name="twitter:creator" />

            <link
                href="/favicons/favicon.png?v=1.0"
                rel="alternate icon"
                type="image/png"
            />
            <link
                href="/favicons/favicon.svg?v=1.0"
                rel="icon"
                type="image/svg+xml"
            />
        </NextHead>
    )
}

export default Head
