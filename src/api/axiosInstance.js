import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

const baseURL = 'https://anhcuong.org/movie'

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: `Bearer ${authTokens?.accessToken}`}
});


axiosInstance.interceptors.request.use(async req => {
    if (!authTokens) {
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
        req.headers.Authorization = `Bearer ${authTokens?.accessToken}`
    }

    const user = jwt_decode(authTokens.accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req


    const response = await axios.post(`${baseURL}/api/basic/user/token/refresh`, {
        refresh: authTokens.refreshToken
    })
    localStorage.setItem('authTokens', JSON.stringify(response.data));
    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
    console.log(req);
    return req;
})

export default axiosInstance;