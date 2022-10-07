import React from 'react';
import PostItemUser from "../../../components/postItemUser/PostItemUser";
import {Post} from "../../../types/postTypes";
import axios from "axios";
import {baseUrl, posts as allPosts} from "../../../constants/api";
import {useRouter} from "next/router";


const Index: React.FC = () => {
    const router = useRouter()
    const id = router.query.id
    const [loading, setLoading] = React.useState<boolean>(false)
    const [post, setPost] = React.useState<any>(null)


    React.useEffect(() => {
        setLoading(true)
        axios.get(`${baseUrl}${allPosts}/${id}`).then((res) => setPost(res.data))
        setTimeout(() => setLoading(false), 1500)

    }, [])


    console.log(post)
    return (
        <>
            {loading ? <>Loading data...</> : <PostItemUser {...post} />}
        </>
    );
};

// export async function getStaticPaths() {
//     const res = await axios.get(`${baseUrl}${allPosts}`)
//     const posts = await res.data
//
//     const paths = posts.map((post: Post) => ({
//         params: {id: post.post_id.toString()},
//     }))
//
//     return {paths, fallback: false}
// }
//
// export async function getStaticProps({params}: any) {
//     console.log(params.id)
//     const res = await axios.get(`${baseUrl}${allPosts}/${params.id}`)
//     const post = res.data
//
//     return {
//         props: {
//             post,
//         },
//     }
// }

export default Index;