import React, {FC} from 'react';
import {baseUrl} from "../../constants/api";
import {Button} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Delete} from "@mui/icons-material";
import usePosts from "../../hooks/usePosts";
import {BasicModal} from "../modal";
import {PostForm} from "../postForm/postForm";

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
            <div onClick={() => handleOpen} style={{
                display: "flex", width: "100%", border: "1px solid", borderRadius: "10px",
                justifyContent: "space-around", padding: "10px", alignItems: "center", margin: '10px'
            }}>
                <img style={{width: "150px", height: "150px", borderRadius: '20px'}}
                     src={`${baseUrl}${image_url}`}
                     alt={title}
                     loading="lazy"
                />
                <p style={{fontSize: "24px", width: "250px",}}>{title}</p>
                <p style={{fontSize: "20px", width: "250px"}}>{content.substring(0, 50)}</p>
                <Button style={{margin: "0 10px"}} onClick={handleOpen} variant="outlined" startIcon={<AddCircleIcon/>}
                >
                    {'edit'}
                </Button>

                <Button style={{marginRight: "10px"}} onClick={() => handleDelete(post_id)} variant="outlined"
                        startIcon={<Delete/>}
                >
                    {'delete'}
                </Button>
            </div>
            <BasicModal open={open} handleClose={() => handleClose()}>
                <PostForm post_id={post_id} create={false} content={content} image_url={image_url} title={title}
                          handleClose={handleClose} fetchData={fetchData}/>
            </BasicModal>
        </>
    );
};
