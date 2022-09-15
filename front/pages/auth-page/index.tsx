import React from 'react';
import {AuthForm} from "../../components/auth-form/auth-form";
import {NextPage} from "next";
import Image from 'next/image'
import bg from '../../image/bg.jpg'
import styles from '../../styles/auth-page.module.css'


 const Index: NextPage = () => {
    return (
        <div className={styles.authPage}>
           <AuthForm/>
            <Image
                src={bg}
                layout="fixed"
                width={500}
                height={500}
            />
            </div>
    );
};

 export default Index;