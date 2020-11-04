module.exports = {
    theme: {
        extend: {
            borderColor: (theme) => ({
                ...theme('colors'),
                default: theme('colors.border', 'currentColor'),
            }),
            boxShadow: {
                top: '0 3px 6px -3px var(--colors-shadow-bar)',
                bottom: '0 -3px 6px -3px var(--colors-shadow-bar)',
                default:
                    '0 2px 3px 1px var(--colors-shadow-light), 0 1px 2px 0 var(--colors-shadow-light)',
                lg:
                    '0 10px 15px -3px var(--colors-shadow-dark), 0 4px 6px -2px var(--colors-shadow-light)',
                outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                none: 'none',
            },
            colors: {
                white: 'hsl(104, 100%, 100%)',
                red: 'var(--colors-red)',
                transparent: 'transparent',

                app: 'var(--colors-app)',
                background: 'var(--colors-background)',
                body: 'var(--colors-body)',
                title: 'var(--colors-title)',
                description: 'var(--colors-description)',
                border: 'var(--colors-border)',
                link: 'var(--colors-link)',

                primary: {
                    default: 'var(--colors-primary-default)',
                    dark: 'var(--colors-primary-dark)',
                },

                gray: {
                    light: 'var(--colors-gray-light)',
                    default: 'var(--colors-gray-default)',
                    dark: 'var(--colors-gray-dark)',
                },

                verified: 'var(--colors-verified)',
            },
            container: {
                center: true,
                padding: '1rem',
            },
            fontFamily: {
                sans: [
                    'Inter UI',
                    'SF Pro Display',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Oxygen',
                    'Ubuntu',
                    'Cantarell',
                    'Open Sans',
                    'Helvetica Neue',
                    'sans-serif',
                ],
            },
            fontSize: {
                '15': '0.9375rem',
                headline: '2.125rem',
                reason: '1.0625rem',
            },
            maxWidth: {
                button: '16.25rem',
                headline: '17rem',
                xxs: '18rem',
                xl: '37.5rem',
            },
            minHeight: {
                list: 'calc(100vh - 6.625rem)',
            },
            spacing: {
                px: '1px',
                avatar: '2.375rem',
                button: '0.625rem',
                disc: '3.25rem',
                '7': '1.75rem',
            },
        },
    },
    variants: {
        backgroundColor: ['disabled', 'responsive', 'hover', 'focus'],
        opacity: ['disabled', 'responsive', 'hover', 'focus'],
        pointerEvents: ['disabled', 'responsive'],
    },
    plugins: [],
}
