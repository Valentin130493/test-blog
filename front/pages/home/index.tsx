import React from 'react';
import {NextPage} from "next";
import {Storage} from "../../utils/sessionStorage";
import {token} from "../../constants/storageKey";

const HomePage: NextPage = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const test = Storage.get(token)
        console.log(test)
    }
    return (
        <div>
    Home
            </div>
    );
};

 export default HomePage;