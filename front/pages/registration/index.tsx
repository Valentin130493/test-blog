import React from 'react';

import {MyImage} from "../../components/myImage/myImage";
import {AuthForm} from "../../components/auth-form";

import bg from "../../image/bg.jpg";
import {styles} from "../../constants/styles";


const Registration = () => {
    return (
        <div style={styles.authPage}>
            <MyImage width={1000} height={500} src={bg} layout={"intrinsic"}/>
            <AuthForm/>
        </div>
    );
};

export default Registration;