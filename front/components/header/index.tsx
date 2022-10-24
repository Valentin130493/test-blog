import React from 'react';
import Box from "@mui/material/Box";
import {styles} from "../../constants/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface HeaderProps {
    username: string
}

export const Header = ({username}: HeaderProps) => {
    const handleClick = () => {
        sessionStorage.clear()
    }

    return (
        <Box sx={styles.header} component="div">
            <Typography>Hello, {username}</Typography>
            <Button variant={"outlined"} onClick={handleClick}>Log Out</Button>
        </Box>
    );
};

