import React, {useState} from 'react';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {baseUrl, upload} from "../../constants/api";
import {ICreatePost} from "../../types/postTypes";
import usePosts from "../../hooks/usePosts";
import {styles} from "../../constants/styles";

interface PostFormProps {
    create?: boolean;
    post_id?: number
    title?: string;
    content?: string;
    image_url?: string;
    fetchData?: any
    handleClose: () => void;
}

const initialState = {
    title: '',
    content: '',
    image_url: ''
}

export const PostForm: React.FC<PostFormProps> = ({
                                                      title,
                                                      content,
                                                      image_url,
                                                      create,
                                                      post_id,
                                                      fetchData,
                                                      handleClose
                                                  }) => {
    const {updatePost, createPost} = usePosts()
    const {handleSubmit, register, setValue} = useForm<ICreatePost>();
    const [post, setPost] = useState(create ? initialState : {title, content, image_url})


    const onSubmitCreate: SubmitHandler<ICreatePost> = async (data) => {
        const {title, content} = data
        const formData = new FormData()
        formData.append('image', data.image_url[0])
        const res = await axios.post(`${baseUrl}${upload}`, formData)
        const image_url = res.data?.url
        setPost({...post, image_url: image_url, title: title, content: content})

        await createPost({
            title: title,
            content: content,
            image_url: image_url
        })
        setPost(initialState)
        await fetchData()
        handleClose()
    }


    const onSubmitUpdate = async (data: ICreatePost) => {
        const {title, content, image_url} = data
        // @ts-ignore
        const condition = post?.image_url.includes(`${image_url}`)
        if (!condition) {
            const formData = new FormData()
            formData.append('image', data.image_url[0])
            const res = await axios.post(`${baseUrl}${upload}`, formData)
            const photo = res.data?.url
            setPost({...post, image_url: photo})
            await updatePost(post_id, {title: title, content: content, image_url: photo});
            await fetchData()
        } else {
            await updatePost(post_id, {title: title, content: content, image_url: post.image_url});
            await fetchData()
        }
        handleClose()
    };


    return (
        <>
            <form style={styles.authFormForm} onSubmit={handleSubmit(create ? onSubmitCreate : onSubmitUpdate)}>
                <TextField
                    {...register("title", {
                        onChange: (e) => setValue("title", e.target.value),
                        value: `${post?.title}`
                    })}
                    label="title"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                />

                <TextField
                    {...register("content", {
                        onChange: (e) => setValue("content", e.target.value),
                        value: `${post.content}`,
                        required: "Required field",
                        min: 3
                    })}
                    multiline
                    maxRows={4}
                    type="text"
                    label="description"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                />

                {post.image_url && <img style={{width: "100px", height: "100px"}} src={`${baseUrl}${post.image_url}`}
                                        alt={post.image_url}/>}

                <TextField
                    {...register("image_url", {value: `${post.image_url}`})}
                    type="file"
                    size="small"
                    margin="normal"
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
                    {create ? 'Submit' : 'Save'}</Button>
            </form>
        </>)
};
