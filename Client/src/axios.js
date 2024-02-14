import axios from "axios";

console.log(import.meta.env.VITE_SERVER);

export const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem("__token__")

    config.headers.Authorization = `Bearer ${token || null}`
    return config
})