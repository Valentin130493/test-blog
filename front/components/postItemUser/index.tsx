import React from 'react';
import {Comments, Post} from "../../types/postTypes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {styles} from "../../constants/styles"
import CommentItem from "./commentItem";
import {Skeleton, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import axios from "axios";
import {baseUrl, comment, posts as allPosts} from "../../constants/api";
import {useAppSelector} from "../../store";

interface ICreateComment {
    content: string
}

const PostItemUser = ({comments, published_date, content, image_url, title}: Post) => {

    const router = useRouter()
    const post_id = router.query.id
    const postId = parseInt(post_id as string)
    const [state, setState] = React.useState<Comments[]>()
    const [post, setPost] = React.useState<Post>()
    const condition = (published_date || content || image_url || title) === undefined
    const {isAuthenticated} = useAppSelector((state) => state.user)
    React.useEffect(() => {
        setState(comments);
        if (condition) {
            axios.get(`${baseUrl}${allPosts}`).then((res) => {
                setPost(res.data.filter((item: Post) => item.post_id === postId)[0])
            })
            setState([])
        }
    }, [])

    const {handleSubmit, register, reset} = useForm<ICreateComment>();
    const onSubmit: SubmitHandler<ICreateComment> = async (inputs) => {
        const user_id = 1

        const {data}: any = await axios.post(`${baseUrl}${comment}`, {...inputs, post_id, user_id})
        setState(state?.concat(data))
        reset()
    }
    const day = condition ? post?.published_date?.substring(0, 10).split('-').reverse().join('-') : published_date?.substring(0, 10).split('-').reverse().join('-')
    const time = condition ? post?.published_date?.substring(11, 19) : published_date?.substring(11, 19)

    return (
        <Box component={'div'} sx={styles.postItemUser.div} style={{margin: "10px 0"}}>
            <Box component={'div'}>
                <img style={styles.postItemUser.img} width={1000} height={500}
                     src={condition ? `${baseUrl}${post?.image_url}` : `${baseUrl}${image_url}`}
                     alt={title}/>

                {(post?.published_date || published_date) && <Box component={'div'}
                                                                  sx={styles.postItemUser.info}>
                    <Typography component={'h1'}
                                sx={styles.postItemUser.title}>{condition ? post?.title : title}</Typography>
                    <Typography sx={styles.postItemUser.content}
                                component={'p'}>{condition ? post?.content : content}</Typography>
                    <Typography component={'p'}
                                sx={styles.postItemUser.publishDate}>published: {day} {time}</Typography>
                </Box>}
            </Box>
            <Box component={'div'} style={{width: state?.length === 0 ? "50%" : "auto"}}>
                < Typography component={'h2'} sx={styles.postItemUser.comment}>Comments </Typography>
                {(post?.comments || state) && state?.map((comment: Comments, index: number) => {
                    return <CommentItem key={index} {...comment} />
                })}

                {isAuthenticated && <Box component={"div"}>
                    <form onSubmit={handleSubmit(onSubmit)} style={styles.postItemUser.form}>
                        <TextField style={styles.postItemUser.textField} {...register("content")}/>
                        <Button type={"submit"} variant={"contained"} style={styles.postItemUser.btn}>add
                            comment</Button>
                    </form>
                </Box>}
            </Box>
        </Box>
    )
        ;
};

export default PostItemUser;