import axios from 'axios';

const service = axios.create({
    baseURL: "https://chat-app-api-ivory.vercel.app/api",
    withCredentials: true
})
export default service;