import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect} from "react";
import axios from "axios";
import {baseUrl, users} from "../../constants/api";
import {Button} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {BasicModal} from "../modal/Modal";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
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
    const [user, setUser] = React.useState<any>(null);
    console.log(user)
    useEffect(()=> {
    if(value===0) axios.get(`${baseUrl}${users}`).then((res)=>{setUser(res.data)})
    },[])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',width: '100%',bgcolor: 'grey' }}>
                <Tabs indicatorColor="secondary"
                      textColor="inherit" variant="fullWidth" centered value={value} onChange={handleChange}>
                    <Tab label="Users" {...a11yProps(0)} />
                    <Tab label="Posts" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <>
                {user && user.map((item:any,index:number)=>{
                    return <Typography component={'span'} key={index}>{item.user_id}</Typography>
                })}
                    </>
                <BasicModal value={value}><p>gggggggggggggg</p></BasicModal>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <BasicModal value={value}><p>tttttttttttt</p></BasicModal>
            </TabPanel>
        </Box>
    );
}
