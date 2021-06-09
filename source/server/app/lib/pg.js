require('dotenv').config({ path: './.env' });
const { createDb, migrate } = require("postgres-migrations")
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.HEROKU_POSTGRES,
    ssl: {
        rejectUnauthorized: false
      }
})

module.exports = {
    
    /**
     * Function which will perform the operation on the database specified by the statement parameter
     * @param  {string} statement
     * @returns The query result
     */
    query: async statement => {
        return await pool.query(statement)
    },
    
    /**
     * Function which will perform the operation on the database specified by statement with an additional parameter to assist in editing or searching the database
     * @param  {string} statement
     * @param  {Object} param
     * @returns The query result
     */
    queryParam: async (statement, param) => {
        return await pool.query(statement, param)
    },
    getClient: async () => {
        return await pool.connect()
    },

    /**
     * Function which will migrate the database
     * @returns A string represention a successful migration
     */
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
