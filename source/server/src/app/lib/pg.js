require('dotenv').config()
const { createDb, migrate } = require("postgres-migrations")
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.HEROKU_POSTGRES,
    ssl: {
        rejectUnauthorized: false
      }
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
            await migrate({ client }, `${process.cwd()}/migrations`)
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
