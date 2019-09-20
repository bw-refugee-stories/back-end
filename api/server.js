const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(helmet())
var corsOptions = {
    credentials: true,
}
server.use(cors(corsOptions))
server.options('*', cors())

const usersRouter = require('../users/users-router')

server.use('/users', usersRouter)

server.get('/', (req, res) => {
    res.status(200).send('<h2>Refugee Stories</h2>')
})

module.exports = server