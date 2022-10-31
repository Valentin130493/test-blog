import React from 'react';


import TextField from "@mui/material/TextField";
import {ErrorMessage} from "@hookform/error-message";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {baseUrl, login} from "../../constants/api";
import {styles} from "../../constants/styles";

interface ISingInForm {
    username: string;
    email: string;
    password: string
}


export const UserForm = () => {
    const {handleSubmit, register, formState: {errors}} = useForm<ISingInForm>();

    const onSubmit: SubmitHandler<ISingInForm> = async (data) => {
        await axios.post(`${baseUrl}${login}`, data)
    };

    return (
        <>
            <form style={styles.authFormForm} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("username", {required: "Required field", min: 3, max: 10})}
                    label="User name"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                />
                <ErrorMessage errors={errors} name="username"/>
                <TextField
                    {...register("email", {required: "Required field", pattern: /[A-Za-z]{3}/})}
                    label="Email"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                />
                <ErrorMessage errors={errors} name="email"/>
                <TextField
                    {...register("password", {required: "Required field", min: 5})}
                    type="password"
                    label="Password"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                />
                <ErrorMessage errors={errors} name="password"/>
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
        </>
    );
};
