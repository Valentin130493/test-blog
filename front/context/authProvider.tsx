import React, {createContext} from 'react';
import {role, tokenKey} from "../constants/storageKey";


interface AuthContext {
    isAuth: boolean;
    isAdmin: boolean
    login: () => void;
}

export const AuthContext = createContext<AuthContext>({
    isAuth: false,
    isAdmin: false,
    login: () => {
    }
})

export const AuthProvider = ({children}: { children: React.ReactNode }) => {

    const [isAuth, setIsAuth] = React.useState<boolean>(false);
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false)

    const login = () => {
        if (process.browser) {
            const token = window.sessionStorage.getItem(tokenKey)
            const admin = window.sessionStorage.getItem(role)

            if (token && (typeof admin !== undefined)) {
                setIsAuth(true)
                setIsAdmin(true)
            } else if (token) {
                setIsAuth(true)
            } else {
                setIsAuth(false)
            }
        }
    }
    console.log(isAuth)
    console.log(isAdmin)
    return (
        <AuthContext.Provider
            value={{
                isAuth,
                isAdmin,
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};