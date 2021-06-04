import axios from './axios'
// test
import { setEmail, setToken } from '../utils/localStorage'
import { getJournals } from './journal'

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
        
        setEmail(email);
        setToken(res.data.token)

        const journals = await getJournals(); 
        return journals[0] 
        // SET TOKEN HERE
    } catch (err) {
        console.log("ERR: ", err)
        throw err.response.data
    }
}

