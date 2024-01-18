const DataTypes = require('sequelize')
const sequelize = require('../../configs/sequelize')

const Book = sequelize.define('Book', {
  book_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
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
  tableName: 'books',
  indexes: [
    {
      unique: true,
      fields: ['title']
    }
  ]
})

module.exports = Book
