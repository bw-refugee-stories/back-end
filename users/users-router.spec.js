const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

// Users Tests
// =============
describe('login/registration server', () => {
    // /register
    describe('registration', () => {

        beforeEach(async () => {
            await db('users').truncate()
        })

        const userData = {username: "user", password: "pass"}

        it('should return a status code 201 when successful', () => {
            let response
            return request(server).post('/users/register').send(userData).then(res => {
                response = res
                expect(response.status).toBe(201)
            })
        })

        it('should return the new username', () => {
            let response
            return request(server).post('/users/register').send(userData).then(res => {
                response = res
                expect(response.body.username).toEqual('user')
            })
        })
    })

    // /login
    describe('login', () => {
        const userData = {username: 'user', password: 'pass'}

        it('should return status code 200 on success', () => {
            let response
            return request(server).post('/users/login').send(userData).then(res => {
                response = res
                expect(response.status).toBe(200)
            })
        })

        it('should return username', () => {
            let response
            return request(server).post('/users/login').send(userData).then(res => {
                response = res
                expect(response.body.username).toEqual('user')
            })
        })
    })
})