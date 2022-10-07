import React from 'react';
import {Comments, Post} from "../../types/postTypes";
import Box from "@mui/material/Box";
import {MyImage} from "../image/MyImage";
import Typography from "@mui/material/Typography";
import {styles} from "../../constants/styles"
import CommentItem from "../commentItem/commentItem";
import {Skeleton, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import axios from "axios";
import {baseUrl, comment, posts as allPosts} from "../../constants/api";

interface ICreateComment {
    content: string
}

const PostItemUser = ({comments, published_date, content, image, title}: Post) => {

    const router = useRouter()
    const post_id = router.query.id
    const postId = parseInt(post_id as string)
    const [state, setState] = React.useState<Comments[]>()
    const [post, setPost] = React.useState<Post>()
    const condition = (published_date || content || image || title) === undefined
    console.log(post)
    console.log(state)
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
        <Box component={'div'} sx={styles.post.div} style={{margin: "10px 0"}}>
            <Box component={'div'}>
                {image ? <MyImage style={{borderRadius: "20px"}} width={1000} height={500}
                                  src={condition ? post?.image : image}
                                  alt={title}/> :
                    <Skeleton variant="rectangular" style={{borderRadius: "20px"}} width={1000} height={500}
                              animation="wave"/>}

                {(post?.published_date || published_date) && <Box component={'div'}
                                                                  style={{
                                                                      display: "flex",
                                                                      flexDirection: 'column',
                                                                      width: "100%",
                                                                      padding: '5px'
                                                                  }}>
                    <Typography component={'h1'} style={{
                        textAlign: 'center',
                        fontSize: "36px"
                    }}>{condition ? post?.title : title}</Typography>
                    <Typography style={{fontSize: "26px", textAlign: 'center', padding: '5px'}}
                                component={'p'}>{condition ? post?.content : content}</Typography>
                    <Typography component={'p'}
                                style={{
                                    textAlign: "end",
                                    fontStyle: "italic",
                                    fontSize: "20px"
                                }}>published: {day} {time}</Typography>
                </Box>}
            </Box>
            <Box component={'div'} style={{width: state?.length === 0 ? "50%" : "auto"}}>
                < Typography component={'h2'} style={{fontSize: "36px"}}>Comments </Typography>
                {(post?.comments || state) && state.map((comment: Comments, index: number) => {
                    return <CommentItem key={index} {...comment} />
                })}

                <Box component={"div"}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", justifyContent: 'space-between'}}>
                        <TextField style={{width: "70%"}} {...register("content")}/>
                        <Button type={"submit"} variant={"contained"} style={{marginLeft: "10px"}}>add comment</Button>
                    </form>
                </Box>
            </Box>
        </Box>
    )
        ;
};

export default PostItemUser;