import React from 'react';
import Header from "../../components/header/Header";
import axios from "axios";
import {baseUrl, postsWithComments} from "../../constants/api";
import {Post} from "../../types/postTypes";
import PostItem from "../../components/postItem/PostItem";

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
                    return <PostItem key={index} {...post}/>
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