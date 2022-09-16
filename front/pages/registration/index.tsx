import React from 'react';
import {AuthFormRegistration} from "../../components/auth-form/auth-form-registration";
import bg from "../../image/bg.jpg";
import {MyImage} from "../../components/image/MyImage";
import styles from "../../styles/auth-page.module.css";

    const Registration = () => {
    return (
        <div className={styles.authPage}>
            <MyImage width={1000} height={500} src={bg} layout={"intrinsic"}/>
            <AuthFormRegistration/>
            </div>
    );
};

export default Registration;