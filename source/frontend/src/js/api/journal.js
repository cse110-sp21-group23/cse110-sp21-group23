import axios from './axios'
import { getToken } from '../utils/localStorage'
import "@babel/polyfill";

export const getJournals = async (header) => {
    try {
        return (await axios.get('journal', nullishCoalesce(header, getHeader()))).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getBulletsByDay = async (journalId, start, header) => {
    try {
        return (await axios.get(`journal/${journalId}/bullet/day/${start.toDateString()}`, nullishCoalesce(header, getHeader()))).data
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
export const addBullet = async (bullet, header) => {
    console.log(bullet); 
    try {
        return (await axios.post(
            'journal/bullet',
            bullet,
            nullishCoalesce(header, getHeader())
        )).data
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const deleteBullet = async (id, header) => {
    try {
        await axios.delete(
            `/journal/bullet/${id}`,
            nullishCoalesce(header, getHeader())
        )
    } catch (err) {
        throw err
    }
}

export const editBullet = async (bullet, header) => {
    try {
        await axios.put(
            `/journal/bullet`,
            bullet,
            nullishCoalesce(header, getHeader())
        )
    } catch (err) {
        throw err
    }
}

export const updateSorting = async (journalId, date, array, header) => {
    try {
        return (
            await axios.patch(
                `journal/${journalId}/day/${date.toDateString()}`,
                {
                    array: array
                },
                nullishCoalesce(header, getHeader())
            )
        ).data
    } catch (err) {
        throw err
    }

}

const getHeader = () => {
    const token = getToken()
    return {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    }
}

const nullishCoalesce = (h1, h2) => {
    if (h1) {
        return h1
    } else {
        return h2
    }
}