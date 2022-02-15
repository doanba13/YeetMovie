import axios from "axios";

const baseURL = 'https://anhcuong.org/movie';
const axiosConfig = axios.create({
    baseURL
});

export default axiosConfig;