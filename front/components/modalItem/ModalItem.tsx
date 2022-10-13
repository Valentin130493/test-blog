import {FC, useState} from "react";
import {styles} from "../../constants/styles";
import {Button} from "@mui/material";
import * as React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import axios from "axios";
import {baseUrl, createPost, upload} from "../../constants/api";
import {Delete} from "@mui/icons-material";
import {MyImage} from "../image/MyImage";


interface ItemMapInterface {
    post_id: number;
    title: string;
    content: string;
    image_url: string;
}

export const ModalItem: FC<ItemMapInterface> = ({post_id, title, content, image_url}) => {
    const {handleSubmit, register, formState: {errors}, setValue} = useForm<ItemMapInterface>();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [image, setImage] = useState(image_url)

    const deletePost = (id: number) => {
        axios.delete(`${baseUrl}${createPost}/${id}`)
    }

    const onSubmit = async (data: ItemMapInterface) => {
        console.log("submit")
        const {title, content,image_url} = data
        const condition = image.includes(`${image_url}`)
        console.log(image_url)
        console.log(condition)
        if(!condition) {
            const formData = new FormData()
            formData.append('image', data.image_url[0])
            const res = await axios.post(`${baseUrl}${upload}`, formData)
            const photo = res.data?.url
            setImage(photo)
            handleClose()
          return await axios.put(`${baseUrl}${createPost}/${post_id}`, {title: title, content: content, image_url: photo});
        }
       await axios.put(`${baseUrl}${createPost}/${post_id}`, {title: title, content: content, image_url: image});
        handleClose()
    };

    return (
        <>
            <Button style={{margin: "0 10px"}} onClick={handleOpen} variant="outlined" startIcon={<AddCircleIcon/>}
            >
                {'edit'}
            </Button>

            <Button style={{marginRight: "10px"}} onClick={() => deletePost(post_id)} variant="outlined"
                    startIcon={<Delete/>}
            >
                {'delete'}
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
                                {...register("title", {
                                    onChange: (e) => setValue("title", e.target.value),
                                    value: `${title}`
                                })}
                                label="title"
                                size="small"
                                margin="normal"
                                fullWidth={true}
                            />

                            <TextField
                                {...register("content", {
                                    onChange: (e) => setValue("content", e.target.value),
                                    value: `${content}`,
                                    required: "Required field",
                                    min: 3
                                })}
                                multiline
                                maxRows={4}
                                type="text"
                                label="description"
                                size="small"
                                margin="normal"
                                fullWidth={true}
                            />

                            {image && <img style={{width:"100px",height:"100px"}} src={`${baseUrl}${image}`}/>}
                            <TextField
                                {...register("image_url", {value:`${image}`})}
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