import React from 'react';
import {Header} from "../../components/header";
import axios from "axios";
import {baseUrl, posts as allPosts} from "../../constants/api";
import {Post} from "../../types/postTypes";
import {Grid, Skeleton} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import {styles} from "../../constants/styles";

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
                        <Box key={index} sx={styles.postUser.box}
                             onClick={() => handleClick(item.post_id)}>
                            {item.image_url ? (
                                <img
                                    style={styles.postUser.img}
                                    alt={item.title}
                                    src={`${baseUrl}${item.image_url}`}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={250} height={150}/>
                            )}
                            {item ? (
                                <Box sx={{pr: 2}}>
                                    <Typography sx={styles.postUser.title} gutterBottom
                                                variant="body2">
                                        {item.title}
                                    </Typography>
                                    <Typography sx={styles.postUser.content} display="block" variant="caption"
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