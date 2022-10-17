import React from 'react';
import PostItemUser from "../../../components/postItemUser/postItemUser";
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
        if (id !== undefined) {
            axios.get(`${baseUrl}${allPosts}/${id}`).then((res) => setPost(res.data))
        }
        setTimeout(() => setLoading(false), 1500)

    }, [id])


    return (
        <>
            {loading ? <>Loading data...</> : <PostItemUser {...post} />}
        </>
    );
};


export default Index;