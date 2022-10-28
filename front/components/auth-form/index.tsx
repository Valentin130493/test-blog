import React, {useEffect} from 'react';

import {useRouter} from "next/router";
import Link from "next/link";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm, SubmitHandler} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';

import {adminPage, authLogin, authReg, userPage} from "../../constants/pages";

import {IRegistrationForm} from "../../types/userTypes";
import {styles} from "../../constants/styles";
import {Box} from '@mui/material';
import {userLogin, userRegister} from "../../store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../../store";


export const AuthForm = () => {
    const router = useRouter()
    console.log(router)
    const dispatch = useAppDispatch()
    const {isAdmin, isAuthenticated} = useAppSelector((state) => state.user)
    console.log(isAdmin, isAuthenticated)
    const {handleSubmit, register, formState: {errors}} = useForm<IRegistrationForm>();

    useEffect(() => {

    }, [isAdmin, isAuthenticated])

    const onSubmitAuth: SubmitHandler<IRegistrationForm> = async (data) => {
        await dispatch(userLogin(data))
        if (isAdmin && isAuthenticated) {
           await router.push(adminPage)
        } else if (isAuthenticated) {
          await  router.push(userPage)
        } else {
           await router.push(authLogin)
        }

    };

    const onSubmitRegister: SubmitHandler<IRegistrationForm> = async (data) => {
        await dispatch(userRegister(data))
        if (isAuthenticated) {
          await  router.push(userPage)
        } else {
           await router.push(authReg)
        }

    };


    return (
        <Box sx={styles.authForm}>
            <Typography variant="h4" component='h1'>
                {router.route === authLogin ? 'Sign in' : 'Registration'}
            </Typography>

            <form style={styles.authFormForm}
                  onSubmit={handleSubmit(router.route === authLogin ? onSubmitAuth : onSubmitRegister)}>
                {router.route === authReg && <TextField
                    {...register("username", {required: "Required field", min: 3, max: 10})}
                    label="User name"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                />}
                <TextField
                    {...register("email", {required: "Required field", pattern: /[A-Za-z]{3}/})}
                    label="Email"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                />
                <ErrorMessage errors={errors} name="email"/>
                <TextField
                    {...register("password", {required: "Required field", min: 3})}
                    type="password"
                    label="Password"
                    size="small"
                    margin="normal"
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
        </Box>
    );
};