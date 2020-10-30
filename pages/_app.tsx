import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Provider as AuthProvider } from 'next-auth/client'
import { SWRConfig } from 'swr'

import { default as fetcher } from '@/lib/fetch'
import '@/styles/global.css'

const App = (props: AppProps) => {
    const { Component, pageProps } = props
    return (
        <ThemeProvider defaultTheme="dark">
            <AuthProvider session={pageProps.session}>
                <SWRConfig
                    value={{
                        fetcher,
                        revalidateOnFocus: false,
                        errorRetryCount: 1,
                    }}
                >
                    <Component {...pageProps} />
                </SWRConfig>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
