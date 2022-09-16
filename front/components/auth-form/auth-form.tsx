import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm,SubmitHandler} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import styles from '../../styles/auth-form.module.css'
import Link from "next/link";

interface ISingInForm {
    email: string;
    password: string;
}

export const AuthForm = () => {
    const {handleSubmit, register,formState: { errors }} = useForm<ISingInForm>();

    const onSubmit: SubmitHandler<ISingInForm> = (data) => console.log(data);
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