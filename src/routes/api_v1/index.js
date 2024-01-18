const express = require('express')
const Router = express.Router()

const auth = require('./auth')
const book = require('./book')

Router
  .use('/auth', auth)
  .use('/book', book)

module.exports = Router
