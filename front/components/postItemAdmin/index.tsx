import React, {FC} from 'react';
import {baseUrl} from "../../constants/api";
import {Button} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Delete} from "@mui/icons-material";
import usePosts from "../../hooks/usePosts";
import {BasicModal} from "../modal";
import {PostForm} from "../postForm/postForm";
import {styles} from "../../constants/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
    post_id: number
    title: string;
    content: string;
    image_url: string;
    fetchData: () => void;
}


export const PostItemAdmin: FC<TabPanelProps> = ({title, content, image_url, post_id, fetchData}) => {
    const {deletePost} = usePosts()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async (id: number) => {
        await deletePost(id)
    }

    return (
        <>
            <Box onClick={() => handleOpen} sx={styles.postItemAdmin.div}>
                <img style={styles.postItemAdmin.img}
                     src={`${baseUrl}${image_url}`}
                     alt={title}
                     loading="lazy"
                />
                <Typography style={styles.postItemAdmin.title}>{title}</Typography>
                <Typography style={styles.postItemAdmin.content}>{content.substring(0, 50)}</Typography>
                <Button style={styles.postItemAdmin.btn} onClick={handleOpen} variant="outlined"
                        startIcon={<AddCircleIcon/>}
                >
                    {'edit'}
                </Button>

                <Button style={styles.postItemAdmin.btn} onClick={() => handleDelete(post_id)} variant="outlined"
                        startIcon={<Delete/>}
                >
                    {'delete'}
                </Button>
            </Box>
            <BasicModal open={open} handleClose={() => handleClose()}>
                <PostForm post_id={post_id} create={false} content={content} image_url={image_url} title={title}
                          handleClose={handleClose} fetchData={fetchData}/>
            </BasicModal>
        </>
    );
};
