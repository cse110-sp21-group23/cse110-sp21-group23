import axios from './axios'
import "@babel/polyfill";

/**
 * Retrieves all journal belonging to a user
 * @param   {Object} - header object (FOR UNIT TESTING)
 * @returns {Array}  - array of journal IDs
 */
export const getJournals = async (header) => {
    try {
        const res = (await axios.get('journal', header))
        console.log(res)
        return res.data
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
 * Function which will add a bullet to the journal and return the data of that bullet
 * @param  {Object} bullet - An entry object containing entry content, type, and if applicable, images and audio attributes.
 * @returns data of bullet added to the journal
 */
export const addBullet = async (bullet, header) => {
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
 * Function which will edit a bullet in the journal
 * @param  {Object} bullet - An entry object containing entry content, type, and if applicable, images and audio attributes.
 */
export const editBullet = async bullet => {
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
 * Function which will set the sorting order for the bullets of a particular day specified by array
 * @param  {int} journalId - The Id used to identify the journal
 * @param  {Date} date     - The day we want to sort the bullets from
 * @param  {Array} array   - list containing new order of bullets
 * @returns data associated with the newly ordered bullets
 */
export const updateSorting = async (journalId, date, array) => {
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
