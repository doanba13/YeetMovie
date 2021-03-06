import {createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import {useHistory} from 'react-router-dom'
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext({
    user: {},
    userData: {},
    authTokens: [],
    loginUser: () => {
    },
    logoutUser: () => {
    },
})

export default AuthContext;


export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null);

    const history = useHistory()


    let loginUser = async (data) => {
        const accessToken = data.accessToken;
        try {
            const token = jwt_decode(accessToken);
            console.log(JSON.stringify(data))
            setUser(token.sub);
            localStorage.setItem('authTokens', JSON.stringify(data))
            axiosInstance.get('/api/user').then(res => {
                setUserData(res.data.data)
                localStorage.setItem('userData', JSON.stringify(res.data.data))
            }).catch(err => {
                console.log(err)
            })

            history.replace('/');
        } catch (error) {
            console.log(error)
            console.log('error token');
        }
    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        setUserData(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('userData')
        history.replace('/')
        window.location.reload(false)
    }

    let contextData = {
        user: user,
        userData: userData,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }


    useEffect(() => {

        if (authTokens) {
            setUser(jwt_decode(authTokens.accessToken))
        }
        setLoading(false)


    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}