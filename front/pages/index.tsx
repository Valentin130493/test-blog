import type {NextPage} from 'next'
import React from "react";
import {AuthForm} from "../components/auth-form/auth-form";
import {MyImage} from "../components/image/myImage";
import bg from "../image/bg.jpg";

import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.authPage}>
                <AuthForm/>
                <MyImage width={1000} height={500} src={bg} layout={"intrinsic"}/>
            </div>
        </div>
    )
}

export default Home
