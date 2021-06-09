'use strict';
const db = require('../lib/pg');

module.exports = {
    
    /**
     * Funcion which will store the user's account information into the database
     * @param  {string} email
     * @param  {string} password
     * @returns id
     */
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
                id: res.id,
            }
        } catch (err) {
            throw err
        }
    },

    /**
     * Function which will get a user account's information specified by the user's id
     * @param  {int} id
     * @returns user information
     */
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

    /**
     * Function which will get a user account's information specified by the user's email
     * @param  {string} email
     * @returns user information
     */
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