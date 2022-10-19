import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {styles} from "../../constants/styles";


interface BasicModalProps {
    open: boolean;
    handleClose: () => void;
    children: any
}


export const BasicModal = ({children, open, handleClose}: BasicModalProps) => {
    return (
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
    );
}