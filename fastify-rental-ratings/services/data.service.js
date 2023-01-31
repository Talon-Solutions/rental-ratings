const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Search = require("../models/Search")
const Reviews = require("../models/Reviews")

class DataService {
  returnSuccess = (code, message) => {
    return {
      statusCode: code,
      message: message
    }
  }

  async getAllLandlords() {
    const search = new Search()
    const result = await search.getAllLandlords()
    return this.returnSuccess(200, result)
  }

  async getAllProperties() {
    const search = new Search()
    const result = await search.getAllProperties()
    return this.returnSuccess(200, result)
  }

  async getAllCities() {
    const search = new Search()
    const result = await search.getAllCities()
    return this.returnSuccess(200, result)
  }

  async searchLandlords(searchStr) {
    const search = new Search()
    const result = await search.searchLandlords(searchStr)
    return this.returnSuccess(200, result)
  }

  async searchProperties(searchStr) {
    const search = new Search()
    const result = await search.searchProperties(searchStr)
    return this.returnSuccess(200, result)
  }

  async searchCities(searchStr) {
    const search = new Search()
    const result = await search.searchCities(searchStr)
    return this.returnSuccess(200, result)
  }

  async getLandlordReviews(id) {
    const reviews = new Reviews({ id })
    const result = await reviews.getLandlordReviews()
    return this.returnSuccess(200, result)
  }
}

module.exports = DataService