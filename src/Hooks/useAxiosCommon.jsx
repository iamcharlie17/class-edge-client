import axios from "axios";

export const axiosCommon = axios.create({
    baseURL: 'https://class-edge-server.vercel.app/'
})