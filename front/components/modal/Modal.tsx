import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {styles} from "../../constants/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {PostForm} from "../postForm/PostForm";


export const BasicModal = ({children,value}:any) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen} variant="outlined" startIcon={<AddCircleIcon/>}
            >
                {value === 0 ? 'create user':'create post'}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    {children}
                </Box>
            </Modal>
        </>
    );
}