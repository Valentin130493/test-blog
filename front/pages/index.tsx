import type {NextPage} from 'next'
import React from "react";
import {AuthForm} from "../components/auth-form";
import {MyImage} from "../components/myImage/myImage";
import bg from "../image/bg.jpg";

import styles from '../styles/auth-page.module.css'


const Home: NextPage = () => {
    return (
        <div className={styles.authPage}>
            <AuthForm />
            <MyImage width={1000} height={500} src={bg} layout={"intrinsic"}/>
        </div>
    )
}

export default Home
