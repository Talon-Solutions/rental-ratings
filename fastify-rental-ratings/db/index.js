const { Pool } = require('pg')
const pool = new Pool()

module.exports = {
    async query(text, params) {
        try {
            return await pool.query(text, params)
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}