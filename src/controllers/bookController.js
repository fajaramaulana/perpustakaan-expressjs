// const { registerUserService } = require('../services/authServices')
const { getBooksService, borrowBookService, getListBorrowedByUserService, getAllListBorrowedBookService } = require('../services/bookServices')
const response = require('../utils/response')

const getBookController = async (req, res, next) => {
  try {
    const filter = {}
    const book = await getBooksService(filter)
    res.status(200).json(response.success(book, 'success get book'))
  } catch (error) {
    console.log(`error on getBookController: ${error}`)
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json(response.error(error.message, 500, error))
    } else {
      return res.status(500).json(response.error('Internal server error', 500, error.message))
    }
  }
}

const borrowBookController = async (req, res, next) => {
  try {
    const body = {
      book_id: req.body.book_id
    }

    const userData = {
      user_id: req.user.user_id
    }
    const book = await borrowBookService(body, userData)
    res.status(201).json(response.success(book, 'Success Borrow Book'))
  } catch (error) {
    console.log(`error on borrowBookController: ${error}`)
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json(response.error(error.message, 500, error))
    } else {
      return res.status(500).json(response.error('Internal server error', 500, error.message))
    }
  }
}

const getListBorrowedByUserController = async (req, res, next) => {
  try {
    const filter = {
      user_id: req.user.user_id
    }
    const borrowedBook = await getListBorrowedByUserService(filter)
    res.status(200).json(response.success(borrowedBook, 'success get borrowed book'))
  } catch (error) {
    console.log(`error on getListBorrowedByUserController: ${error}`)
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json(response.error(error.message, 500, error))
    } else {
      return res.status(500).json(response.error('Internal server error', 500, error.message))
    }
  }
}

const listborrowBookByUserIdController = async (req, res, next) => {
  try {
    const filter = {
      user_id: req.params.id
    }
    const borrowedBook = await getListBorrowedByUserService(filter)
    res.status(200).json(response.success(borrowedBook, 'success get borrowed book'))
  } catch (error) {
    console.log(`error on listborrowBookByUserIdController: ${error}`)
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json(response.error(error.message, 500, error))
    } else {
      return res.status(500).json(response.error('Internal server error', 500, error.message))
    }
  }
}

const listAllBorrowedBookController = async (req, res, next) => {
  try {
    if (req.user.Roles[0].name !== 'admin') {
      return res.status(401).json(response.error('You are not allowed to access this endpoint', 401, 'Unauthorized'))
    }

    const getAllListBorrowedBook = await getAllListBorrowedBookService()

    return res.status(200).json(response.success(getAllListBorrowedBook, 'Success get all list borrowed book'))
  } catch (error) {
    console.log(`error on listAllBorrowedBookController: ${error}`)
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json(response.error(error.message, 500, error))
    } else {
      return res.status(500).json(response.error('Internal server error', 500, error.message))
    }
  }
}

module.exports = {
  getBookController,
  borrowBookController,
  getListBorrowedByUserController,
  listborrowBookByUserIdController,
  listAllBorrowedBookController
}
