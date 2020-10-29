module.exports = {
    purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
    theme: {
        extend: {
            borderColor: (theme) => ({
                ...theme('colors'),
                default: theme('color.border', 'currentColor'),
            }),
            colors: {
                accent: 'var(--color-accent)',
                background: 'var(--color-background)',
                border: 'var(--color-border)',
                heading: 'var(--color-heading)',
                body: 'var(--color-body)',
                fill: 'var(--color-fill)',
                muted: 'var(--color-muted)',
                shadow: 'var(--color-shadow)',
                transparent: 'transparent',
            },
            fontFamily: {
                sans: 'var(--font-sans)',
                mono: 'var(--font-mono)',
            },
            listStyleType: {
                square: 'square',
            },
            maxWidth: {
                item: '5rem',
            },
        },
    },
    variants: {
        opacity: ({ after }) => after(['focus-within']),
    },
}
