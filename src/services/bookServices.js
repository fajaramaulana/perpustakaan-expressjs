const sequelizeCon = require('../configs/sequelize')
const { Book, BorrowBook, User } = require('../database/models')
const { parseDateFormatPublish } = require('../utils/globalHelper')

const getBooksService = async (filter) => {
  try {
    if (!filter) {
      filter = {}
    }
    const books = await Book.findAll({
      where: filter
    })

    return books
  } catch (error) {
    console.log(`error on getBooksService: ${error}`)
    throw new Error(error.message)
  }
}

const borrowBookService = async (bookData, userData) => {
  let transaction
  try {
    transaction = await sequelizeCon.transaction()
    // check if book is ready to borrow
    const book = await Book.findOne({
      where: {
        book_id: bookData.book_id
      }
    })

    if (!book) {
      throw new Error('Book not found')
    }

    const borrowBookCheck = await BorrowBook.findOne({
      where: {
        book_id: bookData.book_id,
        status: 1
      }
    })

    if (borrowBookCheck) {
      throw new Error('Book is not available')
    }

    const checkUserAlreadyBorrowed = await BorrowBook.findOne({
      where: {
        user_id: userData.user_id,
        status: 1
      }
    })

    if (checkUserAlreadyBorrowed) {
      throw new Error('You already borrowed a book')
    }
    const borrowBookNow = {
      book_id: bookData.book_id,
      user_id: userData.user_id,
      status: 1,
      borrow_date: new Date(),
      return_date: new Date() + 7,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userData.user_id,
      updatedBy: 0
    }

    const borrowBook = await BorrowBook.create(borrowBookNow)

    if (!borrowBook) {
      throw new Error('Failed to borrow book')
    }

    // Commit the transaction
    await transaction.commit()

    return borrowBook
  } catch (error) {
    if (transaction) {
      await transaction.rollback()
    }
    console.log(`error on borrowBookService: ${error}`)
    throw new Error(error.message)
  }
}

const getListBorrowedByUserService = async (filter) => {
  try {
    const getBorrowedBook = await BorrowBook.findAll({
      where: filter,
      attributes: ['borrow_book_id', 'borrow_date', 'return_date'],
      include: [
        {
          model: Book,
          as: 'books', // Ensure this alias matches the one in the association
          attributes: ['title', 'author']
        },
        {
          model: User,
          as: 'users', // Ensure this alias matches the one in the association
          attributes: ['name']
        }
      ]
    })
    return getBorrowedBook
  } catch (error) {
    console.log(`error on getListBorrowedByUserService: ${error}`)
    throw new Error(error.message)
  }
}

const getAllListBorrowedBookService = async () => {
  try {
    const getBorrowedBook = await BorrowBook.findAll({
      attributes: ['borrow_book_id', 'borrow_date', 'return_date'],
      include: [
        {
          model: Book,
          as: 'books', // Ensure this alias matches the one in the association
          attributes: ['title', 'author']
        },
        {
          model: User,
          as: 'users', // Ensure this alias matches the one in the association
          attributes: ['name']
        }
      ]
    })

    const dataReturn = []

    getBorrowedBook.forEach((element) => {
      // jika return date melewati tanggal hari ini
      let status
      if (element.return_date > new Date()) {
        status = 'Melebihi batas waktu'
      } else {
        status = 'Belum melebihi batas waktu'
      }
      const data = {
        borrow_book_id: element.borrow_book_id,
        title: element.books.title,
        borrower: element.users.name,
        borrow_date: parseDateFormatPublish(element.borrow_date),
        status
      }
      dataReturn.push(data)
    })

    return dataReturn
  } catch (error) {
    console.log(`error on getAllListBorrowedBookService: ${error}`)
    throw new Error(error.message)
  }
}

module.exports = {
  getBooksService,
  borrowBookService,
  getListBorrowedByUserService,
  getAllListBorrowedBookService
}
