import axios from "axios";

const baseURL = 'http://54.169.180.127/movie';
const axiosConfig = axios.create({
    baseURL
});

export default axiosConfig;