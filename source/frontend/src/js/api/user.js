import axios from 'axios'

const URL = 'http://cse110-23-api.herokuapp.com'

export const register = async (email, password) => {
    try {
        const res = await axios.post(
            `${URL}/user/register`,
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
            `${URL}/user/login`,
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