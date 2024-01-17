const express = require('express')
const { registerController } = require('../../controllers/authController')
const { registerValidationRules } = require('../../utils/validation/validationAuth')
const { validate } = require('../../utils/validation')

const Router = express.Router()

Router
  .post('/register', registerValidationRules(), validate, registerController)

module.exports = Router
