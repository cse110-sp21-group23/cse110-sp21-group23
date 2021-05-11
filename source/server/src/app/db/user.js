'use strict';
const db = require('../lib/pg');

module.exports = {
    store: async (email, password) => {
        try {
            const statement = `
                INSERT INTO user_account
                    (email, password) 
                VALUES
                    ($1, $2) 
                RETURNING 
                    id
            `
            const res = (await db.queryParam(statement, [email, password])).rows[0]
            return {
                name: res.name,

            }
        } catch (err) {
            throw err
        }
    },
    getById: async (id) => {
        try {
            const statement = `
                SELECT 
                    *
                FROM
                    user_account
                WHERE 
                    id = $1 
            `
            return (await db.queryParam(statement, [id])).rows[0]
        } catch (err) {
            throw err
        }
    },
    getByEmail: async (email) => {
        try {
            const statement = `
            SELECT 
                *
            FROM
                user_account
            WHERE 
                email = $1 
        `
            return (await db.queryParam(statement, [email])).rows[0]
        } catch (err) {
            throw err
        }
    }
}