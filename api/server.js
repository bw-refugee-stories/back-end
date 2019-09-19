const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

const usersRouter = require('../users/users-router')

server.use('/users', usersRouter)

server.get('/', (req, res) => {
    res.status(200).send('<h2>Refugee Stories</h2>')
})

module.exports = server