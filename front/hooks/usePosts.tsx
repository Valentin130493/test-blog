import axios from "axios";
import {baseUrl, adminPost, posts} from "../constants/api";
import {ICreatePost} from "../types/postTypes";


export default function usePosts() {

    const getPost = async () => {
        try {
            const res = await axios.get(`${baseUrl}${posts}`)
            return res.data
        } catch (e) {
            console.log(e)
        }
    }

    const createPost = async (data: ICreatePost) => {
        try {
            await axios.post(`${baseUrl}${adminPost}`, data);
        } catch (e) {
            console.log(e)
        }
    }

    const updatePost = async (id: number | undefined, data: { image_url: string | undefined; title: string; content: string }) => {
        try {
            await axios.put(`${baseUrl}${adminPost}/${id}`, data);
        } catch (e) {
            console.log(e)
        }
    }

    const deletePost = async (id: number) => {
        try {
            await axios.delete(`${baseUrl}${adminPost}/${id}`)
            return null
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getPost,
        deletePost,
        updatePost,
        createPost
    }
}