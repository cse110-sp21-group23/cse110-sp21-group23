'use strict';
const db = require('../lib/pg');

/**
 * Function which will insert the bullet into the database and returns the bullet's id
 * @param  {Object} bullet 
 * @returns bullet id
 */
const store = async (bullet) => {
    try {
        const { journalId, body, type, priority, mood, date } = bullet
        const statement = `
            INSERT INTO bullet
                (journal_id, body, type, priority, mood, date) 
            VALUES
                ($1, $2, $3, $4, $5, $6) 
            RETURNING 
                id
        `
        const res = (await db.queryParam(statement, [journalId, body, type, priority, mood, date])).rows[0]
        return {
            id: res.id
        }
    } catch (err) {
        throw err
    }
}

/**
 * Function which will store the journal into the database
 * @param  {string} title - Title of the journal
 * @returns The journal id
 */
const storeJournal = async (title) => {
    try {
        const statement = `
            INSERT INTO journal
                (title)
            VALUES
                ($1) 
            RETURNING 
                id
        `
        const res = (await db.queryParam(statement, [title])).rows[0]
        return {
            id: parseInt(res.id)
        }
    } catch (err) {
        console.log(err)
        throw err
    }

}

/**
 * Function which will store the day specified by date into the database
 * @param  {int} journalId
 * @param  {Date} date
 * @returns id
 */
const storeDay = async (journalId, date) => {
    try {
        const statement = `
            INSERT INTO day
                (journal_id, date) 
            VALUES
                ($1, $2) 
            RETURNING 
                id
        `
        const res = (await db.queryParam(statement, [journalId, date])).rows[0]
        return {
            id: parseInt(res.id)
        }
    } catch (err) {
        throw err
    }
}

/**
 * Function which will set a user's (specified by userId) journal (specified by journalId)
 * @param  {int} userId
 * @param  {int} journalId
 * @returns id
 */
const setUserJournal = async (userId, journalId) => {
    try {
        const statement = `
            INSERT INTO user_journal
                (user_id, journal_id)
            VALUES
                ($1, $2) 
            RETURNING 
                id
        `
        const res = (await db.queryParam(statement, [userId, journalId])).rows[0]
        return {
            id: res.id
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

/**
 * Function which returns a journal based off of the user id
 * @param  {int} id
 * @returns The journal of the usre that matches the user id
 */
const getJournalByUserId = async (id) => {
    try {
        const statement = `
            SELECT
                j.id,
                j.title
            FROM
                user_journal u_j
            INNER JOIN
                journal j
            ON
                j.id = u_j.journal_id
            WHERE
                u_j.user_id = $1;
        `
        return (await db.queryParam(statement, [id])).rows
    } catch (err) {
        throw err
    }
}

/**
 * Function which will get the bullets from the journal specified by journalId from the start time (start) to the end time (end)
 * @param  {int} journalId
 * @param  {Date} start
 * @param  {Date} end
 * @returns Bullets from the journal specified by journalId from the start time (start) to the end time (end)
 */
const getByInterval = async (journalId, start, end) => {
    try {
        const statement = `
            SELECT 
                *
            FROM
                bullet
            WHERE 
                journal_id = $1 AND date >= $2 AND date < $3
        `
        return (await db.queryParam(statement, [journalId, start, end])).rows
    } catch (err) {
        throw err
    }
}

/**
 * Function which will return the data held in the day column of the database from the journal specified by journalId from the start time (start) to the end time (end)
 * @param  {int} journalId
 * @param  {Date} start
 * @param  {Date} end
 * @returns The data held in the day column of the database from the journal specified by journalId from the start time (start) to the end time (end)
 */
const getDayByInterval = async (journalId, start, end) => {
    try {
        const statement = `
            SELECT 
                *
            FROM
                day
            WHERE 
                journal_id = $1 AND date >= $2 AND date < $3
        `
        return (await db.queryParam(statement, [journalId, start, end])).rows
    } catch (err) {
        throw err
    }
}

/**
 * Function which will edit a bullet
 * @param  {Object} bullet
 * @returns A string signaling a successful update
 */
const update = async (bullet) => {
    try {
        const { id, body, type, isDone, priority, mood, date } = bullet
        const statement = `
            UPDATE 
                bullet 
            SET
                body = $2, type = $3, is_done = $4, priority = $5, mood = $6, date = $7
            WHERE id = $1
        `
        await db.queryParam(statement, [id, body, type, isDone, priority, mood, date])
        return 'Success'
    } catch (err) {
        throw err
    }
}

/**
 * Function which will delete the bullet specified by id
 * @param  {int} id
 * @returns A string signaling a successful deletion
 */
const deleteBullet = async (id) => {
    try {
        const statement = `
            DELETE FROM
                bullet
            WHERE id = $1
        `
        await db.queryParam(statement, [id])
        return 'Success'
    } catch (err) {
        throw err
    }
}

/**
 * Function which will edit the way the bullets for a particular day are ordered
 * @param  {int} dayId
 * @param  {Array} arr
 * @returns A string signaling a successful update
 */
const updateSorting = async (dayId, arr) => {
    try {
        const statement = `
        UPDATE 
            day 
        SET
            bullets = $2
        WHERE 
            id = $1
        `
        await db.queryParam(statement, [dayId, arr])
        return 'Success'
    } catch (err) {
        throw err
    }
}

module.exports = {
    store,
    storeJournal,
    storeDay,
    setUserJournal, 
    getJournalByUserId, 
    getByInterval,
    getDayByInterval, 
    update, 
    deleteBullet, 
    updateSorting
} 
