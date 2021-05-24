import axios from './axios'
import { getToken } from '../utils/localStorage'

export const getJournals = async () => {
    try {
        return (await axios.get('journal', getHeader())).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getBulletsByDay = async (journalId, start) => {
    try {
        console.log("start: ", start)
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
export const addBullet = async (bullet) => {
    try {
        await axios.post(
            'journal/bullet',
            bullet,
            getHeader()
        )
    } catch (err) {
        console.log(err)
        throw err
    }
}

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

const getHeader = () => {
    const token = getToken()
    console.log("token:  ", token)
    return {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    }
}