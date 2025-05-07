import axios from 'axios';
import { API_URL } from "@api";

const loginUser = async (body) => {
    return await axios.post(API_URL + 'auth/api/v1/login', { ...body });
}


const registerUser = async (body) => {
    return await axios.post(API_URL + 'auth/api/v1/register', { ...body });
}


export { loginUser, registerUser };