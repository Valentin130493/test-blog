import React from 'react';
import Box from "@mui/material/Box";
import {styles} from "../../constants/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface HeaderProps {
    username: string
}

export const Header = ({username}: HeaderProps) => {
    return (
        <Box sx={styles.header} component="div">
            <Typography>Hello, {username}</Typography>
            <Button variant={"outlined"}>Log Out</Button>
        </Box>
    );
};

