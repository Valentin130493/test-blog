import React from 'react';
import Header from "../../components/header/Header";
import axios from "axios";
import {baseUrl, posts as allPosts} from "../../constants/api";
import {Post} from "../../types/postTypes";
import {Grid, Skeleton} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";

interface UserPageProps {
    posts: Post[]
}

const UserPage: React.FC<UserPageProps> = ({posts}) => {
    const router = useRouter()
    const handleClick = async (id: number) => {
        await router.push(`post/${id}`)
    }
    return (
        <>
            <Header username="Vasay Krasavtsev"/>
            <>

                <Grid container wrap="wrap" spacing={1} style={{padding: "0 50px"}}>
                    {(posts.length === 0 ? Array.from(new Array(3)) : posts).map((item, index) => (
                        <Box key={index} sx={{width: 250, marginRight: 1, my: 5}}
                             onClick={() => handleClick(item.post_id)}>
                            {item.image_url ? (
                                <img
                                    style={{width: 250, height: 150}}
                                    alt={item.title}
                                    src={`${baseUrl}${item.image_url}`}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={250} height={150}/>
                            )}
                            {item ? (
                                <Box sx={{pr: 2}}>
                                    <Typography style={{textAlign: 'center', fontSize: '24px'}} gutterBottom
                                                variant="body2">
                                        {item.title}
                                    </Typography>
                                    <Typography style={{textAlign: 'center'}} display="block" variant="caption"
                                                color="text.secondary">
                                        {item.content.substring(0, 50)}...
                                    </Typography>

                                </Box>
                            ) : (
                                <Box sx={{pt: 0.5}}>
                                    <Skeleton/>
                                    <Skeleton width="60%"/>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Grid>


            </>
        </>
    );
};

export async function getStaticProps() {
    const res = await axios.get(`${baseUrl}${allPosts}`)
    const posts = res.data

    return {
        props: {
            posts
        },
    }
}

export default UserPage;