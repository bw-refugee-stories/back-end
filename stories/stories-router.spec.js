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
                expect(response.body.length).toBe(4)
            })
        })
    })

    // get /:id
    describe('Get a story by its id', () => {
        it('should return a story whose id matches the id in the url', () => {
            const expectedId = 1
            let response
            return request(server).get('/stories/1').then(res => {
                response = res
                expect(response.body.id).toBe(expectedId)
            })
        })
    })
    // post /
    describe('add a new story', () => {
        
    })

    // put /:id
    describe('edit a story', () => {

    })

    // delete
    describe('remove a story', () => {

    })
})



// Comment Tests
// =============
describe('the comments router', () => {
    // get /:id/comments
    describe('get a storys comments', () => {

    })

    // post /:id/comments
    describe('add a comment to a story', () => {

    })

    // delete /comments/:id 
    describe('delete a comment from a story', () => {

    })
})
