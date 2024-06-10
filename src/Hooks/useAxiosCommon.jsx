import axios from "axios";

export const axiosCommon = axios.create({
    baseURL: 'http://localhost:3200/'
})