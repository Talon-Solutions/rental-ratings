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

Review.prototype.getReview = async function(id) {
    try {
        const { rows } = await db.query(
            `SELECT get_review($1)`,
            [id]
        )
        return rows[0].get_review
    } catch (e) {
        throw e
    }
}

Review.prototype.deleteReview = async function(id) {
    try {
        const { rows } = await db.query(
            'select delete_review($1)',
            [id]
        )
        return rows[0].delete_review
    } catch (e) {
        throw e
    }
}

module.exports = Review
