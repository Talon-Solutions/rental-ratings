const db = require('../db/index')

function User() {}

User.prototype.login = async function(userInfo) {
    try {
        const { rows } = await db.query(
            `SELECT login_user($1)`,
            [userInfo.email]
        )
        return rows[0].login_user
    } catch (e) {
        throw e
    }
}

User.prototype.register = async function(userInfo) {
    try {
        const { rows } = await db.query(
            `SELECT register_user($1, $2)`,
            [userInfo.email, userInfo.password]
        )
        return rows[0].register_user
    } catch (e) {
        throw e
    }
}

module.exports = User