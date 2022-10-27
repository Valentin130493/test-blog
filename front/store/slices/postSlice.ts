import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {baseUrl, posts} from "../../constants/api";
import {userLogin, userSlice, UserState} from "./userSlice";
import {Post} from "../../types/postTypes";


export interface PostState {
    loading: boolean,
    error: any,
    posts: Post[]
}

export const PostGet = createAsyncThunk (
    'post/get',
    async ( _,thunkAPI) => {
        try {
            return await axios.get(`${baseUrl}${posts}`);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error});
        }
    }
)

const initialState: PostState = {
    loading: false,
    error: null,
    posts:[]
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            PostGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder.addCase(
            PostGet.fulfilled, (state, {payload}:any) => {
                state.posts = payload.data;
                state.loading = false;
            });
        builder.addCase(
            PostGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    }
})

export default postSlice.reducer

