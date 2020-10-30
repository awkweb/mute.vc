import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Provider as AuthProvider } from 'next-auth/client'

import '@/styles/global.css'

const App = (props: AppProps) => {
    const { Component, pageProps } = props
    return (
        <ThemeProvider defaultTheme="dark">
            <AuthProvider session={pageProps.session}>
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
