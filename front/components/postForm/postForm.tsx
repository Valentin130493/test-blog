import React, {useState} from 'react';
import styles from "../../styles/auth-form.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {baseUrl, createPost, login, upload} from "../../constants/api";


interface ICreatePost {
    title: string;
    content: string;
    image_url: string
}

export const PostForm = () => {
    const {handleSubmit, register} = useForm<ICreatePost>();
    const [post, setPost] = useState({
        title: '',
        content: '',
        image_url: ''
    })
    console.log(post)

    const onSubmit: SubmitHandler<ICreatePost> = async (data) => {
        const {title, content} = data
        const formData = new FormData()
        formData.append('image', data.image_url[0])
        const res = await axios.post(`${baseUrl}${upload}`, formData)
        const image_url = res.data?.url
        setPost({...post, image_url: image_url, title: title, content: content})

        await axios.post(`${baseUrl}${createPost}`, {
            title: title,
            content: content,
            image_url: image_url
        })
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
                    {...register("image_url", {required: "Required field", min: 3})}
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
