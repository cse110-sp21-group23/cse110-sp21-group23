'use strict';
const db = require('../lib/pg');

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
            id: res.id
        }
    } catch (err) {
        console.log(err)
        throw err
    }

}

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
            id: res.id
        }
    } catch (err) {
        throw err
    }
}

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
