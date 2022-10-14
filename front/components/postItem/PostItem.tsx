import React, {FC} from 'react';
import {ModalItem} from "../modalItem/ModalItem";
import {baseUrl} from "../../constants/api";

interface TabPanelProps {
    post_id: number
    title: string;
    content: string;
    image_url: string;
    fetchData: any
}


export const PostItem: FC<TabPanelProps> = ({title, content, image_url, post_id,fetchData}) => {
    const [, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

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
            </div>
            <ModalItem post_id={post_id} content={content} title={title} image_url={image_url} fetchData={fetchData}/>
        </>
    );
};
