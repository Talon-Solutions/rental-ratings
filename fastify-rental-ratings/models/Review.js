const db = require('../db/index')

function Review() {}

Review.prototype.leaveReview = async function(reviewData) {
    try {
        const { rows } = await db.query(
            `SELECT leave_review($1)`,
            [reviewData]
        )
        return rows[0].leave_review
    } catch (e) {
        throw e
    }
}

module.exports = Review