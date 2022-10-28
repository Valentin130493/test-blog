import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {baseUrl, login, registration} from "../../constants/api";
import {tokenKey} from "../../constants/storageKey";

interface UserDataProps {
    email: string,
    password: string,
    username?: string
}

export interface UserState {
    loading: boolean,
    error: any,
    userInfo: any | null,
    isAuthenticated: boolean,
    isAdmin: boolean
}

export const userLogin = createAsyncThunk(
    'user/login',
    async (userData: UserDataProps, thunkAPI) => {
        try {
            return await axios.post(`${baseUrl}${login}`, userData);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error});
        }
    }
)


export const userRegister = createAsyncThunk(
    'user/register',
    async (userData: UserDataProps, thunkAPI) => {
        try {
            return await axios.post(`${baseUrl}${registration}`, userData);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error});
        }
    }
)

const initialState: UserState = {
    userInfo: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isAdmin: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            userLogin.pending, (state) => {
                state.loading = true;
                state.userInfo = null;
                state.isAuthenticated = false;
            });
        builder.addCase(
            userLogin.fulfilled, (state, {payload}: any) => {
                const {user_id, username, email, token, role} = payload.data
                sessionStorage.setItem(tokenKey, token)
                if (role) {
                    state.isAdmin = true
                }
                state.userInfo = {user_id, username, email};
                state.isAuthenticated = true;
                state.loading = false;
            });
        builder.addCase(
            userLogin.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.error;
            });
        builder.addCase(
            userRegister.pending, (state) => {
                state.loading = true;
                state.userInfo = null;
                state.isAuthenticated = false;
            });
        builder.addCase(
            userRegister.fulfilled, (state, {payload}:any) => {
                const {user_id, username, email, token, role} = payload.data
                sessionStorage.setItem(tokenKey, token)
                state.userInfo = {user_id, username, email};
                state.isAuthenticated = true;
                state.loading = false;
            });
        builder.addCase(
            userRegister.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.error.message;
            });
    }
})

export default userSlice.reducer