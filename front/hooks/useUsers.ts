import axios from "axios";
import {baseUrl, login, registration, users} from "../constants/api";
import {Storage} from "../utils/sessionStorage";
import {token} from "../constants/storageKey";
import {IRegistrationForm} from "../types/userTypes";

export default function useUsers() {

    const userLogin = async (obj: IRegistrationForm) => {
        const {data} = await axios.post(`${baseUrl}${login}`, obj)
        Storage.set(token, data.token)
    }

    const userRegister = async (obj: IRegistrationForm) => {
        const {data} = await axios.post(`${baseUrl}${registration}`, obj)
        Storage.set(token, data.token)
    }

    const getUsers = async () => {
        try {
            const res = await axios.get(`${baseUrl}${users}`)
            return res.data
        } catch (e) {
            console.log(e)
        }
    }

    return {getUsers, userLogin, userRegister}
}