'use strict'

const AuthService = require('../../services/auth.service')

module.exports = async function (fastify, opts) {
    const authService = new AuthService()

    fastify.post('/login', async function (request, reply) {
        let res = {
            statusCode: 400,
            message: 'Error logging in'
        }

        res = await authService.login(request.body)

        reply
            .code(res.statusCode)
            .send(res.message)
    })

    fastify.post('/register', async function (request, reply) {
        let res = {
            statusCode: 400,
            message: 'Error registering'
        }

        res = await authService.register(request.body)

        reply
            .code(res.statusCode)
            .send(res.message)
    })
}