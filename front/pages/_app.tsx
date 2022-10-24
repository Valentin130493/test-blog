import React from "react";

import '../styles/globals.css'
import type {AppProps} from 'next/app'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {AuthProvider} from "../context/authProvider";


function MyApp({Component, pageProps}: AppProps) {


    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )

}

export default MyApp
