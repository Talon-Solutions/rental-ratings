const db = require('../db/index')

function UserReviews() {}

UserReviews.prototype.userReviews = async function(user) {
  try {
    const { rows } = await db.query(
      `select get_user_reviews($1)`,
      [user]
    )
    return rows[0].get_user_reviews
  } catch (e) {
    throw e
  }
}

module.exports = UserReviews
