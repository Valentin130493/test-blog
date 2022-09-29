import React from 'react';
import styles from "../../styles/auth-form.module.css";
import TextField from "@mui/material/TextField";
import {ErrorMessage} from "@hookform/error-message";
import Button from "@mui/material/Button";
import {register} from "tsconfig-paths";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {baseUrl, login} from "../../constants/api";
import {Storage} from "../../utils/sessionStorage";
import {token} from "../../constants/storageKey";


interface ISingInForm {
    title: string;
    description: string;
    img: any
}

export const PostForm = () => {
    const {handleSubmit, register,formState: { errors }} = useForm<ISingInForm>();

    const onSubmit: SubmitHandler<ISingInForm> = async (data) =>
    {const result = await axios.post(`${baseUrl}${login}`,data)
        Storage.set(token,result.data.token)};

    return (
        <>
        <form className={styles.authFormForm} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...register("title", {required: "Required field", pattern: /[A-Za-z]{3}/})}
                label="title"
                size="small"
                margin="normal"
                className={styles.authFormInput}
                fullWidth={true}
            />
            <ErrorMessage errors={errors} name="email" />
            <TextField
                {...register("description",{required:"Required field",min:3})}
                multiline
                maxRows={4}
                type="text"
                label="description"
                size="small"
                margin="normal"
                className={styles.authFormInput}
                fullWidth={true}
            />
            <TextField
                {...register("img",{required:"Required field",min:3})}
                type="file"
                size="small"
                margin="normal"
                className={styles.authFormInput}
                fullWidth={true}
            />
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
</>)
};
