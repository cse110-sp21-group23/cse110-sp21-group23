import axios from './axios'
import { getToken } from '../utils/localStorage'

/**
 * Function which will return the user's journal data
 * @returns user's journal data
 */
export const getJournals = async () => {
    try {
        return (await axios.get('journal', getHeader())).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

/**
 * Function which will return the bullets for a certain day from the journal
 * @param  {int} journalId - The Id used to identify the journal
 * @param  {Date} start    - The day we want the bullets of
 * @returns bullets in the user's journal for a specific day (specified by start)
 */
export const getBulletsByDay = async (journalId, start) => {
    try {
        return (await axios.get(`journal/${journalId}/bullet/day/${start.toDateString()}`, getHeader())).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

/*
Bullet must look like this
    {
        "journalId": 7, 
        "body": "23", 
        "type": "task", 
        "priority": 2, 
        "mood": 1, 
        "date": "2021-03-30"
    }
*/
/**
 * Function which will add a bullet to the journal and return the data of that bullet
 * @param  {Object} bullet - An entry object containing entry content, type, and if applicable, images and audio attributes.
 * @returns data of bullet added to the journal
 */
export const addBullet = async (bullet) => {
    try {
        return (await axios.post(
            'journal/bullet',
            bullet,
            getHeader()
        )).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

/**
 * Function which will delete a bullet from the journal
 * @param  {int} id - id of the bullet that is being deleted
 */
export const deleteBullet = async id => {
    try {
        await axios.delete(
            `/journal/bullet/${id}`,
            getHeader()
        )
    } catch (err) {
        throw err
    }
}

/**
 * Function which will edit a bullet in the journal
 * @param  {Object} bullet - An entry object containing entry content, type, and if applicable, images and audio attributes.
 */
export const editBullet = async bullet => {
    try {
        await axios.put(
            `/journal/bullet`,
            bullet,
            getHeader()
        )
    } catch (err) {
        throw err
    }
}

/**
 * Function which will set the sorting order for the bullets of a particular day specified by array
 * @param  {int} journalId - The Id used to identify the journal
 * @param  {Date} date     - The day we want to sort the bullets from
 * @param  {Array} array   - list containing new order of bullets
 * @returns data associated with the newly ordered bullets
 */
export const updateSorting = async (journalId, date, array) => {
    try {
        return (
            await axios.patch(
                `journal/${journalId}/day/${date.toDateString()}`,
                {
                    array: array
                },
                getHeader()
            )
        ).data
    } catch (err) {
        throw err
    }

}

/**
 * Function which will return the content-type header used HTTP requests with axios
 * @returns content-type header used HTTP requests with axios
 */
const getHeader = () => {
    const token = getToken()
    return {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    }
}