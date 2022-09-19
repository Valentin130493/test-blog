import {RootState} from "../index";

export const authStateSelector = (state: RootState): boolean => state.user.isAuthenticated
const userInfo = (state: RootState): boolean => state.user.userInfo