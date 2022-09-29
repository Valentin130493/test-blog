import React from 'react';
import {useRouter} from "next/router";
import BasicTabs from "../../components/TubPanel";

const AdminPage = () => {
    const router = useRouter();
    console.log(router)
    return (
        <div>
          <BasicTabs/>
            </div>
    );
};

export default AdminPage;