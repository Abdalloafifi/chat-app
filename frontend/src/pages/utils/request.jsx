import axios from 'axios';

const service = axios.create({
    baseURL: "https://0l9l56xf-8080.uks1.devtunnels.ms/api",
    withCredentials: true
})
export default service;