import NextHead from 'next/head'
import { useTheme } from 'next-themes'

type Props = {
    title?: string
    description?: string
}

const Head: React.FC<Props> = (props) => {
    const { title, description } = props
    const { theme } = useTheme()

    const ogUrl = `https://mute.vc`
    const ogImage = `${ogUrl}/og.png`
    const iconTheme = theme === 'light' ? 'light' : 'dark'

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
            <meta content={ogUrl} name="og:url" />
            <meta content={ogImage} name="og:image" />

            <meta content={ogImage} name="twitter:image" />
            <meta content="summary_large_image" name="twitter:card" />

            <link
                href={`/favicons/${iconTheme}.png?v=1.0`}
                key="dynamic-favicon-alternate"
                rel="alternate icon"
                type="image/png"
            />
            <link
                href={`/favicons/${iconTheme}.svg?v=1.0`}
                key="dynamic-favicon"
                rel="icon"
                type="image/svg+xml"
            />
        </NextHead>
    )
}

export default Head
