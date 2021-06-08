import axios from './axios'
import { getToken } from '../utils/localStorage'
import "@babel/polyfill";

/**
 * Retrieves all journal belonging to a user
 * @param   {Object} - header object (FOR UNIT TESTING)
 * @returns {Array}  - array of journal IDs
 */
export const getJournals = async (header) => {
    try {
        return (await axios.get('journal', header).data)
    } catch (err) {
        console.log(err)
        throw err
    }
}

/**
 * Retrieves all bullets belonging to a user in a particular date
 * @param   {String} - journalId
 * @param   {Date}   - start date 
 * @param   {String} - end date
 * @param   {Object} - header object (FOR UNIT TESTING)
 * @returns {Array}  - array of journal IDs
 */
export const getBulletsByDay = async (journalId, start, header) => {
    try {
        return (await axios.get(`journal/${journalId}/bullet/day/${start.toDateString()}`, header)).data
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
 * Creates a bullet 
 * @param   {Object} - Bullet Object
 * @param   {Object} - header object (FOR UNIT TESTING)
 */
export const addBullet = async (bullet, header) => {
    console.log(bullet); 
    console.log("header")

    try {
        return (await axios.post(
            'journal/bullet',
            bullet,
            header
        )).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

/**
 * Deletes a bullet 
 * @param   {String} - bulletId
 * @param   {Object} - header object (FOR UNIT TESTING)
 */
export const deleteBullet = async (id, header) => {
    try {
        await axios.delete(
            `/journal/bullet/${id}`,
            header
        )
    } catch (err) {
        throw err
    }
}

/**
 * Edit a bullet 
 * @param   {Object} - new Bullet Object
 * @param   {Object} - header object (FOR UNIT TESTING)
 */
export const editBullet = async (bullet, header) => {
    try {
        await axios.put(
            `/journal/bullet`,
            bullet,
            header
        )
    } catch (err) {
        throw err
    }
}

/**
 * Updates the order at which the bullets will be returned 
 * @param   {String} - journalId
 * @param   {Date}   - date
 * @param   {Array}  - array of bulletId's
 * @param   {Object} - header object (FOR UNIT TESTING)
 */
export const updateSorting = async (journalId, date, array, header) => {
    try {
        console.log(date.toDateString())
        return (
            await axios.patch(
                `journal/${journalId}/day/${date.toDateString()}`,
                {
                    array: array
                },
                header
            )
        ).data
    } catch (err) {
        console.log(err)
        throw err
    }

}
