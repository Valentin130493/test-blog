import React, {useContext, useEffect} from 'react';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {BasicModal} from "../../components/modal";
import {UserForm} from "../../components/userForm/userForm";
import {PostForm} from "../../components/postForm/postForm";

import usePosts from "../../hooks/usePosts";
import useUsers from "../../hooks/useUsers";
import {Post} from "../../types/postTypes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import {User} from "../../types/userTypes";
import {PostItemAdmin} from "../../components/postItemAdmin";
import {styles} from "../../constants/styles";
import {AuthContext} from "../../context/authProvider";
import Link from "next/link";
import {userPage} from "../../constants/pages";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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

const AdminPage = () => {
    const {isAdmin} = useContext(AuthContext)
    console.log(isAdmin)
    const [value, setValue] = React.useState(0);

    const [posts, setPosts] = React.useState<Post[]>();
    const [user, setUser] = React.useState<User[]>();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {getPost} = usePosts()
    const {getUsers} = useUsers()


    const fetchData = async () => {
        if (value === 0) getUsers().then((res) => {
            setUser(res)
        })
        if (value === 1) await getPost().then((res) => {
            setPosts(res)
        })
    }


    useEffect(() => {
        fetchData()
    }, [value])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (

        isAdmin ? (<>
            <Box sx={styles.adminPage.main}>
                <Tabs indicatorColor="secondary"
                      textColor="inherit" variant="fullWidth" centered value={value} onChange={handleChange}>
                    <Tab label="Users" {...a11yProps(0)} />
                    <Tab label="Posts" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box sx={styles.adminPage.tabPanelBox}>
                    <Button style={styles.adminPage.tabPanelButton} onClick={handleOpen}
                            variant="outlined" startIcon={<AddCircleIcon/>}
                    >
                        {'create user'}
                    </Button>
                    <BasicModal open={open} handleClose={() => handleClose()}><UserForm/></BasicModal>

                    {user && user.map((item: any, index: number) =>
                        (<Typography component={'span'} key={index}>
                                <p>{item.username}</p>
                                <p>{item.email}</p>
                            </Typography>
                        ))}
                </Box>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box sx={styles.adminPage.tabPanelBox}>
                    <Button style={styles.adminPage.tabPanelButton} onClick={handleOpen}
                            variant="outlined"
                            startIcon={<AddCircleIcon/>}
                    >
                        {'create post'}
                    </Button>
                    <BasicModal open={open} handleClose={() => handleClose()}><PostForm create={true}
                                                                                        handleClose={() => handleClose()}
                                                                                        fetchData={fetchData}/></BasicModal>

                    {posts && posts.map((item: Post, index: number) => (
                            <PostItemAdmin key={index} {...item} fetchData={fetchData}/>
                        )
                    )}

                </Box>
            </TabPanel>

        </>) : (<Link href={userPage}>back to user</Link>)


    );
};

export default AdminPage;