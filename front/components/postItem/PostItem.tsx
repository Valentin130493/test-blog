import React from 'react';
import {Comments, Post} from "../../types/postTypes";
import Box from "@mui/material/Box";
import {MyImage} from "../image/MyImage";
import Typography from "@mui/material/Typography";
import {styles} from "../../constants/styles"
import CommentItem from "../commentItem/commentItem";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

const PostItem = ({comments, published_date, content, image, title}: Post) => {
    const day = published_date.substring(0, 10).split('-').reverse().join('-')
    const time = published_date.substring(11, 19)
    return (
        <Box component={'div'} sx={styles.post.div} style={{margin: "10px 0"}}>
            <Box component={'div'}>
                <MyImage style={{borderRadius: "20px"}} width={1000} height={500}
                         src={`https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png`}
                         alt={title}/>
                <Typography component={'h1'} style={{textAlign: 'center', fontSize: "36px"}}>{title}</Typography>
                <Box component={'div'} style={{display: "flex", flexDirection:'column', width: "100%"}}>
                    <Typography style={{ fontSize: "26px", textAlign: 'center'}} component={'p'}>{content}</Typography>
                    <Typography component={'p'}
                                style={{fontStyle: "italic", fontSize: "20px"}}>published: {day} {time}</Typography>
                </Box>
            </Box>
            <Box component={'div'}>
                <Typography component={'h2'} style={{textAlign: 'center', fontSize: "36px"}} >Comments </Typography>
                {comments && comments.map((comment: Comments, index: number) => {
                    return <CommentItem key={index} {...comment} />
                })}
                <Box component={"div"} style={{display: "flex", justifyContent: 'space-between',}}>
                    <TextField style={{width: "70%"}}/>
                    <Button variant={"contained"} style={{marginLeft: "10px"}}>add comment</Button>
                </Box>
            </Box>
        </Box>
    )
        ;
};

export default PostItem;