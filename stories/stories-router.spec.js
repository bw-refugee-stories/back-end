const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

// Stories Tests
// =============
describe('Stories Router', () => {

    // get /
    describe('Get all the stories', () => {

        it('should return a status code of 200', () => {
            const expectedCode = 200
            let response
            request(server).get('/stories').then(res => {
                response = res
                expect(response.status).toBe(expectedCode)
            })
        })
        
        it('should return a stories object', () => {
            let response
            return request(server).get('/stories').then(res => {
                response = res
                expect(response.type).toBe('application/json')
                expect(res.body.length).toBe(4)
            })
        })
    })

    // get /:id
    // post /
    // put /:id
    // delete
})



// Comment Tests
// =============
// get /:id/comments
// post /:id/comments
// delete /comments/:id