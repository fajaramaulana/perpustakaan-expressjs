const { DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize')

const BorrowBook = sequelize.define('BorrowBook', {
  borrow_book_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  book_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '1: Borrowed, 2: Returned'
  },
  borrow_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 0
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'borrow_books'
})

module.exports = BorrowBook
