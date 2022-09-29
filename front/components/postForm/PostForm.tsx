import React, {useState} from 'react';
import styles from "../../styles/auth-form.module.css";
import TextField from "@mui/material/TextField";
import {ErrorMessage} from "@hookform/error-message";
import Button from "@mui/material/Button";
import {register} from "tsconfig-paths";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {baseUrl, createPost, login, upload} from "../../constants/api";
import {Storage} from "../../utils/sessionStorage";
import {token} from "../../constants/storageKey";
import {MyImage} from "../image/MyImage";


interface ICreatePost {
    title: string;
    content: string;
    imageUrl: string
}

export const PostForm = () => {
    const {handleSubmit, register} = useForm<ICreatePost>();
    const [posts, setPosts] = useState({
        title: '',
        content: '',
        imageUrl: ''
    })
    console.log(posts)

    const onSubmit: SubmitHandler<ICreatePost> = async (data) => {
        const {title,content} = data
        const {imageUrl} = posts
        const formData = new FormData()
        formData.append('image', data.imageUrl[0])
        const res = await axios.post(`${baseUrl}${upload}`, formData)
        setPosts({...posts, imageUrl: res.data?.url})
        const test = await axios.post(`${baseUrl}${createPost}`, {title,content,imageUrl})
        console.log(test)
    }


    return (
        <>
            <form className={styles.authFormForm} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("title", {required: "Required field"})}
                    label="title"
                    size="small"
                    margin="normal"
                    className={styles.authFormInput}
                    fullWidth={true}
                />

                <TextField
                    {...register("content", {required: "Required field", min: 3})}
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
                    {...register("imageUrl", {required: "Required field", min: 3})}
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
