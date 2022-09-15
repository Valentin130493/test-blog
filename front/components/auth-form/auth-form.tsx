import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm, SubmitHandler} from "react-hook-form";
import styles from '../../styles/auth-form.module.css'

interface ISingInForm {
    email: string;
    password: string;
}

export const AuthForm = () => {
    const {handleSubmit, register} = useForm<ISingInForm>();

    const onSubmit: SubmitHandler<ISingInForm> = (data) => console.log(data);
    return (
        <div className={styles.authForm}>
            <Typography variant="h4" component='h1'>
                Войдите
            </Typography>
            <Typography variant="subtitle1" component='p' gutterBottom={true} className={styles.authFormSubtitle}>
                Чтобы получить доступ
            </Typography>
            <form className={styles.authFormForm} onSubmit={handleSubmit(onSubmit)}>
                {/*<Controller*/}
                {/*control={control}*/}
                {/*name="Email"*/}
                {/*render={({field})=>(*/}
                <TextField
                    {...register("email", {required: "Required field"})}
                    label="Email"
                    size="small"
                    margin="normal"
                    className={styles.authFormInput}
                    fullWidth={true}
                    // onChange={(e)=> field.onChange(e)}
                    // value={field.value}
                />
                {/*)}*/}
                {/*/>*/}

                {/*<Controller*/}
                {/*    control={control}*/}
                {/*    name="Password"*/}
                {/*    render={({field})=>(*/}
                <TextField
                    {...register("password", {required: "Required field"})}
                    label="Password"
                    size="small"
                    margin="normal"
                    className={styles.authFormInput}
                    fullWidth={true}
                    // onChange={(e)=> field.onChange(e)}
                    // value={field.value}
                />
                {/*)}*/}
                {/*/>*/}
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