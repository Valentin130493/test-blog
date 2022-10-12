import {FC, useState} from "react";
import {styles} from "../../constants/styles";
import {Button} from "@mui/material";
import * as React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {register} from "tsconfig-paths";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {baseUrl, createPost, upload} from "../../constants/api";
import {string} from "prop-types";


interface ItemMapInterface {
    post_id: number;
    title: string;
    content: string;
    imageUrl: string;
}

export const ModalItem:FC<ItemMapInterface> = ({post_id,title,content,imageUrl}) => {
    const {handleSubmit, register,formState: {errors},setValue} = useForm<ItemMapInterface>();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = (data: ItemMapInterface) => {
        console.log(data);
    };
    return (
        <>
            <Button onClick={handleOpen} variant="outlined" startIcon={<AddCircleIcon/>}
            >
                {'edit'}
            </Button>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={handleClose}
            >
                <Box sx={styles.modal}>
                    <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register("title", {onChange: (e) => setValue(e.target.value),value: `${title}`})}
                            label="title"
                            size="small"
                            margin="normal"
                            fullWidth={true}
                        />

                        <TextField
                            {...register("content", {onChange: (e) => setValue(e.target.value),value: `${content}`,required: "Required field", min: 3})}
                            multiline
                            maxRows={4}
                            type="text"
                            label="description"
                            size="small"
                            margin="normal"
                            fullWidth={true}
                        />
                        <TextField
                            {...register("imageUrl", {required: "Required field", min: 3})}
                            type="file"
                            size="small"
                            margin="normal"
                            fullWidth={true}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth={true}
                            disableElevation={true}
                            sx={{
                                marginTop: 2
                            }}
                        >
                            Save</Button>
                    </form>
                    </>
                </Box>
            </Modal>
        </>
    );
}