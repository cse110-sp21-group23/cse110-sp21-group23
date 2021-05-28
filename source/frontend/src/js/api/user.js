import axios from './axios'
import { setToken } from '../utils/localStorage'
// test
export const register = async (email, password) => {
    try {
        const res = await axios.post(
            `user/register`,
            {
                email: email,
                password: password
            },
        )
        return 'success'
    } catch (err) {
        throw err.response.data
    }
}

export const login = async (email, password) => {
    try {
        const res = await axios.post(
            `user/login`,
            {
                "email": email,
                "password": password
            },
        )
        setToken(res.data.token)
        // SET TOKEN HERE
    } catch (err) {
        console.log("ERR: ", err)
        throw err.response.data
    }
}
