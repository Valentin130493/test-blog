import React from 'react';
import Header from "../../components/header/Header";
import axios from "axios";
import {baseUrl, postsWithComments} from "../../constants/api";
import {Post} from "../../types/postTypes";
import PostItemUser from "../../components/postItemUser/PostItemUser";

interface UserPageProps {
    posts: Post[]
}

const UserPage: React.FC<UserPageProps> = ({posts}) => {
    console.log(posts)

    return (
        <>
            <Header username="Vasay Krasavtsev"/>
            <>
                {posts.map((post, index: number) => {
                    return <PostItemUser key={index} {...post}/>
                })}
            </>
        </>
    );
};

export async function getStaticProps() {
    const res = await axios.get(`${baseUrl}${postsWithComments}`)
    const posts = res.data

    return {
        props: {
            posts
        },
    }
}

export default UserPage;