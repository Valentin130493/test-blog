import React from 'react';
import Typography from "@mui/material/Typography";
import styles from "../../styles/auth-form.module.css";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {baseUrl, registration} from "../../constants/api";
import axios from "axios";


interface IRegistrationForm {
    username: string;
    email: string;
    password: string;
}

export const AuthFormRegistration = () => {
    const {handleSubmit, register, formState: {errors}} = useForm<IRegistrationForm>();

    const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
        const result = await axios.post(`${baseUrl}${registration}`, data)
    };
    return (
        <div className={styles.authForm}>
            <Typography variant="h4" component='h1'>
                Registration
            </Typography>
            <Typography variant="subtitle1" component='p' gutterBottom={true}
                        className={styles.authFormRegistrationSubtitle}>
            </Typography>
            <form className={styles.authFormForm} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("username", {required: "Required field", min: 3, max: 10})}
                    label="User name"
                    size="small"
                    margin="normal"
                    className={styles.authFormInput}
                    fullWidth={true}
                />
                <ErrorMessage errors={errors} name="username"/>
                <TextField
                    {...register("email", {required: "Required field"})}
                    type="email"
                    label="Email"
                    size="small"
                    margin="normal"
                    className={styles.authFormInput}
                    fullWidth={true}
                />
                <ErrorMessage errors={errors} name="email"/>
                <TextField
                    {...register("password", {required: "Required field", min: 5})}
                    type="password"
                    label="Password"
                    size="small"
                    margin="normal"
                    className={styles.authFormInput}
                    fullWidth={true}
                />
                <ErrorMessage errors={errors} name="password"/>
                <Link href="/">
                    <a>Back to Login</a>
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
