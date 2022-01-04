import {createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import {useHistory} from 'react-router-dom'
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)

    const history = useHistory()

    let loginUser = async (data) => {
        const accessToken = data.accessToken;
        try {
            const token = jwt_decode(accessToken);
            setUser(token.sub);
            localStorage.setItem('authTokens', JSON.stringify(data))
            history.replace('/');
        } catch (error) {
            console.log('error token');
        }
        await axiosInstance.get('/api/user').then(res => {
            setUser(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }
    console.log(user);
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.replace('/login')
    }

    let contextData = {
        user: user,
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