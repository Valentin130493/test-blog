import React from 'react';
import {AuthForm} from "../../components/auth-form/auth-form";
import {NextPage} from "next";
import bg from '../../image/bg.jpg'
import styles from '../../styles/auth-page.module.css'
import {MyImage} from "../../components/image/MyImage";


const AuthPage: NextPage = () => {

    return (
        <div className={styles.authPage}>
            <AuthForm/>
            <MyImage width={1000} height={500} src={bg} layout={"intrinsic"}/>
        </div>
    );
};

export default AuthPage;