import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect} from "react";
import axios from "axios";
import {baseUrl, createPost, getPosts, users} from "../../constants/api";
import {BasicModal} from "../modal/Modal";
import {PostForm} from "../postForm/PostForm";
import {UserForm} from "../userForm/userForm";
import {ImageList, ImageListItem} from "@mui/material";
import {PostItem} from "../postItem/PostItem";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface ItemMapInterface {
    post_id: number
    title: string;
    content: string;
    image_url: string;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [posts, setPosts] = React.useState<any>(null);
    const [user, setUser] = React.useState<any>(null);


    useEffect(() => {
        if (value === 0) axios.get(`${baseUrl}${users}`).then((res) => {
            setUser(res.data)
        })
        if (value === 1) axios.get(`${baseUrl}${getPosts}`).then((res) => {
            setPosts(res.data)
        })
    }, [value])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', width: '100%', bgcolor: 'grey'}}>
                <Tabs indicatorColor="secondary"
                      textColor="inherit" variant="fullWidth" centered value={value} onChange={handleChange}>
                    <Tab label="Users" {...a11yProps(0)} />
                    <Tab label="Posts" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <>
                    {user && user.map((item: any, index: number) => {
                        return <Typography component={'span'} key={index}>
                            <div><p>{item.user_id}</p>
                                <p>{item.username}</p>
                                <p>{item.email}</p>
                            </div>
                        </Typography>
                    })}
                </>
                <BasicModal value={value}><UserForm/></BasicModal>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <>
                    {posts && posts.map((item: ItemMapInterface, index: number) => <PostItem key={index} {...item}/>)}
                </>
                <BasicModal value={value}><PostForm/></BasicModal>
            </TabPanel>
        </Box>
    );
}
