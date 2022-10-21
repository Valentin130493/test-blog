import React, {createContext} from 'react';
import {role, tokenKey} from "../constants/storageKey";

// import {Storage} from "../utils/sessionStorage";


interface AuthContext {
    isAuth: boolean
    login: () => void;
}

export const AuthContext = createContext<AuthContext>({
    isAuth: false,
    login: () => {
    }
})

export const AuthProvider = ({children}: { children: React.ReactNode }) => {


    const [isAuth, setIsAuth] = React.useState<boolean>(false);

    const login = () => {
        if (process.browser) {
            const token = window.sessionStorage.getItem(tokenKey)
            const admin = window.sessionStorage.getItem(role)
            if (!token && !admin) {
                setIsAuth(false)
            } else {
                setIsAuth(true)
            }
        }
    }
    console.log(isAuth)
    return (
        <AuthContext.Provider
            value={{
                isAuth,
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};