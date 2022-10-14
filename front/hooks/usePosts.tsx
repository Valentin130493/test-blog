import axios from "axios";
import {baseUrl, createPost, posts} from "../constants/api";

export default function usePosts () {
    const getPost = async () => {
        try {
            const res = await axios.get(`${baseUrl}${posts}`)
            return res.data
        }
      catch (e) {
          console.log(e)
      }
    }

    const updatePost = async (id:number,data:any) => {
        try {
            await axios.put(`${baseUrl}${createPost}/${id}`, data);
        }
        catch (e) {
            console.log(e)
        }
    }

    const deletePost = async (id:number) => {
        try {
            await  axios.delete(`${baseUrl}${createPost}/${id}`)
            return null
        }
        catch (e) {
            console.log(e)
        }
    }

    return {
        getPost,
        deletePost,
        updatePost
    }
}