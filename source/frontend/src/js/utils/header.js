import { getToken } from './localStorage'

/**
 * Updates the order at which the bullets will be returned 
 * @returns   {String} - header of requests
 */
export default function getHeader() {
    const token = getToken()
    return {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    }
}