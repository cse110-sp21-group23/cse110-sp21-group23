import axios from './axios'
// test
var localStorage = require('../utils/localStorage')
var journalAPI = require('./journal')

/**
 * Registers new account
 * @returns {String} - success message
 */

/**
 * Function which will register a new account given that the credentials given are valid
 * @param  {string} email     - account email
 * @param  {string} password  - account password
 * @returns a string signaling successful account creation 
 */
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

/**
 * Function which will log in to an account given the correct credentials
 * @param  {string} email    - account email
 * @param  {string} password - account password
 * @returns {String} - JWT token
 * @returns The bullet journal associated with the login credentials
 */
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

