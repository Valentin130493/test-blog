import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import {ImageList, ImageListItem} from "@mui/material";
import {ModalItem} from "../modalItem/ModalItem";

interface TabPanelProps {
    post_id: number
    title: string;
    content: string;
    imageUrl: string;
}


export const PostItem: FC<TabPanelProps> = ({title,content,imageUrl,post_id}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Typography onClick={()=>handleOpen} component={'span'}>
            <div style={{
                display: "flex", width: "100%", border: "1px solid",
                justifyContent: "center", margin: "5px"
            }}>
                <p>{post_id}</p>
                <p>{title}</p>
                <p>{content}</p>
                <ImageList sx={{width: 250, height: 150}} variant="woven" cols={3} gap={8}>
                    <ImageListItem key={imageUrl}>
                        <img
                            src={`${imageUrl}?w=161&fit=crop&auto=format`}
                            srcSet={`${imageUrl}?w=161&fit=crop&auto=format&dpr=2 2x`}
                            alt={title}
                            loading="lazy"
                        />
                    </ImageListItem>
                </ImageList>
            </div>
            <ModalItem post_id={post_id} content={content} title={title} imageUrl={imageUrl}/>
        </Typography>
    );
};
