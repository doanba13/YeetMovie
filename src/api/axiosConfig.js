import axios from "axios";

const baseURL = 'https://54.169.180.127';
const axiosConfig = axios.create({
    baseURL
});

export default axiosConfig;