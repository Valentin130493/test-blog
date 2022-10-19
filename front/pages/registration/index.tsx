import React from 'react';

import {MyImage} from "../../components/myImage/myImage";
import {AuthForm} from "../../components/auth-form";

import bg from "../../image/bg.jpg";
import styles from "../../styles/auth-page.module.css";

const Registration = () => {
    return (
        <div className={styles.authPage}>
            <MyImage width={1000} height={500} src={bg} layout={"intrinsic"}/>
            <AuthForm/>
        </div>
    );
};

export default Registration;