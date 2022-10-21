import React from "react";
import {SessionProvider} from "next-auth/react"
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// @ts-ignore
function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {


    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )

}

export default MyApp
