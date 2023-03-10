const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Search = require("../models/Search")
const Reviews = require("../models/Reviews")
const Review = require('../models/Review')
const UserReviews = require('../models/UserReviews')

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

    async getPropertyReviews(id) {
        const reviews = new Reviews({ id })
        const result = await reviews.getPropertyReviews()
        return this.returnSuccess(200, result)
    }

  async leaveReview(reviewData) {
    const review = new Review()
    const result = await review.leaveReview(reviewData)
    return this.returnSuccess(200, result)
  }

    async getReview(id) {
        const review = new Review()
        const result = await review.getReview(id)
        return this.returnSuccess(200, result)
    }

    async userReviews(user) {
        const reviews = new UserReviews()
        const result = await reviews.userReviews(user)
        return this.returnSuccess(200, result)
    }

    async deleteReview(id) {
        const review = new Review()
        const result = await review.deleteReview(id)
        return this.returnSuccess(200, result)
    }
}

module.exports = DataService
