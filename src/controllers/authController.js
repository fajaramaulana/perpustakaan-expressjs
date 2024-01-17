// const { registerUserService } = require('../services/authServices')
const response = require('../utils/response')
const { registerUserService } = require('../services/authServices')

const registerController = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body)
    // return res.status(201).json(response.success('User successfully registered', user))
    res.status(201).json(response.success('User successfully registered', user))
  } catch (error) {
    console.log(`error on registerController: ${error}`)
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json(response.error(error.message, 500, error))
    } else {
      return res.status(500).json(response.error('Internal server error', 500, error.message))
    }
  }
}

module.exports = {
  registerController
}
