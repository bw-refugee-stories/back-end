const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.status(200).send('<h2>Refugee Stories</h2>')
})

module.exports = server