import axios from './axios'
// test
var localStorage = require('../utils/localStorage')
var journalAPI = require('./journal')

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
        return res.data.token
    } catch (err) {
        throw err.response.data
    }
}

