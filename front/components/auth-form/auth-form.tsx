import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm,SubmitHandler} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import styles from '../../styles/auth-form.module.css'
import Link from "next/link";
import axios from "axios";
import {baseUrl, login} from "../../constants/api";
import {Storage} from "../../utils/sessionStorage";
import {token} from "../../constants/storageKey";

interface ISingInForm {
    email: string;
    password: string;
}

export const AuthForm = () => {
    const {handleSubmit, register,formState: { errors }} = useForm<ISingInForm>();

    const onSubmit: SubmitHandler<ISingInForm> = async (data) =>
    {const result = await axios.post(`${baseUrl}${login}`,data)
        Storage.set(token,result.data.token)};
    return (
        <div className={styles.authForm}>
            <Typography variant="h4" component='h1'>
                Sign in
            </Typography>
            <Typography variant="subtitle1" component='p' gutterBottom={true} className={styles.authFormSubtitle}>
            </Typography>
            <form className={styles.authFormForm} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("email", {required: "Required field", pattern: /[A-Za-z]{3}/})}
                    label="Email"
                    size="small"
                    margin="normal"
                    className={styles.authFormInput}
                    fullWidth={true}
                />
                <ErrorMessage errors={errors} name="email" />
                        <TextField
                            {...register("password",{required:"Required field",min:3})}
                            type="password"
                            label="Password"
                            size="small"
                            margin="normal"
                            className={styles.authFormInput}
                            fullWidth={true}
                        />
                <ErrorMessage errors={errors} name="password" />
                <Link href="/registration">
                    <a>Go to Registration</a>
                </Link>
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