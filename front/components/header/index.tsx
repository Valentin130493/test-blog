import React from 'react';
import Box from "@mui/material/Box";
import {styles} from "../../constants/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import {authLogin} from "../../constants/pages";
import {useAppSelector} from "../../store";

interface HeaderProps {
    username: string
}

export const Header = ({username}: HeaderProps) => {
    const router = useRouter()
    const {isAuthenticated} = useAppSelector((state) => state.user)

    const handleClick = async () => {
        if (isAuthenticated) {
            sessionStorage.clear()
            await router.push(authLogin)
        } else {
            await router.push(authLogin)
        }
    }

    return (
        <Box sx={isAuthenticated ? styles.headerAuth : styles.headerNotAuth} component="div">
            {isAuthenticated && <Typography>Hello, {username}</Typography>}
            {isAuthenticated ? <Button variant={"outlined"} onClick={handleClick}>Log Out</Button> :
                <Button variant={"outlined"} onClick={handleClick}>Log in</Button>}
        </Box>
    );
};

