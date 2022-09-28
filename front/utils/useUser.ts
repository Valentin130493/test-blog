import {token} from "../constants/storageKey";

export function useUser() {
    const isAuth = () => {
        return window.sessionStorage.getItem(token)
    }
    return {isAuth}
}