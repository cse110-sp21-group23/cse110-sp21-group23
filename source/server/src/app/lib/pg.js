require('dotenv').config()
const {createDb, migrate} =  require("postgres-migrations")
const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

module.exports = {
    query: async statement => {
        return await pool.query(statement)
    },
    queryParam: async (statement, param) => {
        return await pool.query(statement, param)
    },
    getClient: async () => {
        return await pool.connect()
    },
    migrate: async () => {
        try {
            const client = await pool.connect()
            await migrate({client}, `${process.cwd()}/migrations`)
            await client.end()
            console.log("DB successfully migrated!!!")
            return 'Database Migrated'
        } catch (err) {
            console.log("DB migration FAILED!!!")
            console.log("=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/")
            console.log(err)
            console.log("=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/")
            return 'Database Migration FAILED'
        }
    }
}
