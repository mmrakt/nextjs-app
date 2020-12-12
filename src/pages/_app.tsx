import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../components/theme'
import { Provider } from 'react-redux'
import store from '../store'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import 'minireset.css'
import '../base.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css'
import currentUser from '../auth/currentUser'

export const AuthContext = React.createContext(null)

type IProps = {
    Component: React.ReactNode
    pageProps: any
}
// NOTE: functionでなくconstにすると下記エラーとなる
// The default export is not a React Component
export default function MyApp(props: IProps): React.ReactElement {
    const { Component, pageProps } = props

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    const client = () => {
        return new ApolloClient({
            link: new HttpLink({
                uri: 'http://localhost:8080/v1/graphql',
            }),
            cache: new InMemoryCache(),
        })
    }

    return (
        <>
            <Head>
                <title>日報つーる</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <ApolloProvider client={client}>
                        <AuthContext.Provider value={currentUser}>
                            <Component {...pageProps} />
                        </AuthContext.Provider>
                    </ApolloProvider>
                </ThemeProvider>
                j
            </Provider>
        </>
    )
}
