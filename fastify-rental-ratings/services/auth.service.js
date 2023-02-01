const User = require('../models/User')

class AuthService {
    returnSuccess = (code, message) => {
        return {
            statusCode: code,
            message: message
        }
    }

    async login(userInfo) {
        const user = new User()
        const result = await user.login(userInfo)
        if (result === null) {
            return this.returnSuccess(200, "Cannot find user with this email")
        }
        return this.returnSuccess(200, result)
    }

    async register(userInfo) {
        const user = new User()
        const result = await user.register(userInfo)
        if (result === null) {
            return this.returnSuccess(200, "User already exists")
        }
        return this.returnSuccess(200, result)
    }
}

module.exports = AuthService