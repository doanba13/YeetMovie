import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

const baseURL = 'http://54.169.180.127/movie'

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: `Bearer ${authTokens?.accessToken}`}
});

axiosInstance.interceptors.request.use(async req => {
    if (!authTokens) {
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
        req.headers.Authorization = `Bearer ${authTokens?.accessToken}`
        console.log(req.headers.Authorization);
    }

    const user = jwt_decode(authTokens.accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log(isExpired);

    if (!isExpired) return req

    const response = await axios.post(`${baseURL}/api/basic/user/token/refresh`, {
        refresh: authTokens.refreshToken
    })

    localStorage.setItem('authTokens', JSON.stringify(response.data));
    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
    console.log(authTokens);
    return req;
})

console.log();

export default axiosInstance;