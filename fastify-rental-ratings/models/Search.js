const db = require('../db/index')

function Search() {}

Search.prototype.getAllLandlords = async function() {
    try {
      const { rows } = await db.query(
        `SELECT get_all_landlords()`
      )
      return rows[0].get_all_landlords
    } catch (e) {
      throw e
    }
  }
  
Search.prototype.getAllProperties = async function() {
    try {
        const { rows } = await db.query(
        `SELECT get_all_properties()`
        )
        return rows[0].get_all_properties
    } catch (e) {
        throw e
    }
}

Search.prototype.getAllCities = async function() {
    try {
        const { rows } = await db.query(
        `SELECT get_all_cities()`
        )
        return rows[0].get_all_cities
    } catch (e) {
        throw e
    }
}

Search.prototype.searchLandlords = async function(searchStr) {
    try {
        const { rows } = await db.query(
        `SELECT search_landlords($1)`,
        [searchStr]
        )
        return rows[0].search_landlords
    } catch (e) {
        throw e
    }
}

Search.prototype.searchProperties = async function(searchStr) {
    try {
        const { rows } = await db.query(
        `SELECT search_properties($1)`,
        [searchStr]
        )
        return rows[0].search_properties
    } catch (e) {
        throw e
    }
}

Search.prototype.searchCities = async function(searchStr) {
    try {
        const { rows } = await db.query(
        `SELECT search_cities($1)`,
        [searchStr]
        )
        return rows[0].search_cities
    } catch (e) {
        throw e
    }
}

module.exports = Search
