const express = require('express')
const { authenticateJWT } = require('../../middleware/jwtMiddleware')
const { getBookController, borrowBookController, getListBorrowedByUserController, listborrowBookByUserIdController, listAllBorrowedBookController } = require('../../controllers/bookController')
const { borrowBookValidationRules } = require('../../utils/validation/validationBook')
const { validate } = require('../../utils/validation')

const Router = express.Router()

Router
  .get('/', authenticateJWT, getBookController)
  .post('/borrow', authenticateJWT, borrowBookValidationRules(), validate, borrowBookController)
  .get('/getlistcorrowedbyuser', authenticateJWT, getListBorrowedByUserController)
  .get('/borrowbookbyuserid/:id', authenticateJWT, listborrowBookByUserIdController)

  .get('/listallborrowedbook', authenticateJWT, listAllBorrowedBookController)

module.exports = Router
