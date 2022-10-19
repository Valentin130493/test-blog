import React from 'react';

import {useRouter} from "next/router";
import Link from "next/link";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm, SubmitHandler} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';

import {authLogin, authReg, userPage} from "../../constants/pages";
import useUsers from "../../hooks/useUsers";
import {IRegistrationForm} from "../../types/userTypes";

import styles from '../../styles/auth-form.module.css'

export const AuthForm = () => {
    const router = useRouter()
    const {userLogin, userRegister} = useUsers()
    const {handleSubmit, register, formState: {errors}} = useForm<IRegistrationForm>();

    const onSubmitAuth: SubmitHandler<IRegistrationForm> = async (data) => {
        await userLogin(data)
        await router.push(userPage)
    };

    const onSubmitRegister: SubmitHandler<IRegistrationForm> = async (data) => {
        await userRegister(data)
        await router.push(authLogin)
    };


    return (
        <div className={styles.authForm}>
            <Typography variant="h4" component='h1'>
                {router.route === authLogin ? 'Sign in' : 'Registration'}
            </Typography>
            <Typography variant="subtitle1" component='p' gutterBottom={true} className={styles.authFormSubtitle}>
            </Typography>
            <form className={styles.authFormForm}
                  onSubmit={handleSubmit(router.route === authLogin ? onSubmitAuth : onSubmitRegister)}>
                {router.route === authReg && <TextField
                    {...register("username", {required: "Required field", min: 3, max: 10})}
                    label="User name"
                    size="small"
                    margin="normal"
                    className={styles.authFormInput}
                    fullWidth={true}
                />}
                <TextField
                    {...register("email", {required: "Required field", pattern: /[A-Za-z]{3}/})}
                    label="Email"
                    size="small"
                    margin="normal"
                    className={styles.authFormInput}
                    fullWidth={true}
                />
                <ErrorMessage errors={errors} name="email"/>
                <TextField
                    {...register("password", {required: "Required field", min: 3})}
                    type="password"
                    label="Password"
                    size="small"
                    margin="normal"
                    className={styles.authFormInput}
                    fullWidth={true}
                />
                <ErrorMessage errors={errors} name="password"/>
                {router.route === authLogin ?
                    <Link href={authReg}>
                        Go to Registration
                    </Link> :
                    <Link href={authLogin}>
                        Back to Login
                    </Link>}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    disableElevation={true}
                    sx={{
                        marginTop: 2
                    }}
                >
                    Submit</Button>
            </form>
        </div>
    );
};