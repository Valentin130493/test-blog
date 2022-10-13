import React from 'react';
import {Comments} from "../../types/postTypes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";




const CommentItem = ({content, user, published_date}: Comments) => {



    const day = published_date.substring(0, 10).split('-').reverse().join('-')
    const time = published_date.substring(11, 19)
    return (
        <Box component={'div'}
             style={{border: '1px solid #000', borderRadius: '15px', margin: "5px 0", padding: '0 10px'}}>

            <Typography component={'p'} style={{fontSize: "26px"}}> {content}</Typography>

            <Box component={'div'}
                 style={{display: "flex", width: '1000px', justifyContent: 'space-between'}}>
                <Typography component={'p'} style={{fontSize: "20px"}}> user: {user}</Typography>
                <Typography component={'p'}
                            style={{fontStyle: "italic", fontSize: "20px"}}>published: {day} {time}</Typography>
            </Box>
        </Box>
    );
};

export default CommentItem;