const db = require('../db/index')

function Reviews({
                id
              }) {
  this.id = id
}

Reviews.prototype.getLandlordReviews = async function() {
  try {
    const { rows } = await db.query(
      `select get_landlord_reviews($1)`,
      [this.id]
    )
    console.log(this.id)
    return rows[0].get_landlord_reviews
  } catch (e) {
    throw e
  }
}

Reviews.prototype.getPropertyReviews = async function() {
  try {
    const { rows } = await db.query(
      `select get_property_reviews($1)`,
      [this.id]
    )
    return rows[0].get_property_reviews
  } catch (e) {
    throw e
  }
}

Reviews.prototype.getCityReviews = async function() {
  try {
    const { rows } = await db.query(
      `select get_city_reviews($1)`,
      [this.id]
    )
    return rows[0].get_city_reviews
  } catch (e) {
    throw e
  }
}

module.exports = Reviews