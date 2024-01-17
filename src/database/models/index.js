// /src/database/models/index.js
const User = require('./user')
const RefreshToken = require('./refreshToken')
const Permission = require('./permission')
const Role = require('./role')
const RolePermission = require('./rolePermission')
const UserRole = require('./userRole')
const Book = require('./book')
const BorrowBook = require('./borrowBook')

User.hasMany(RefreshToken, { foreignKey: 'user_id' })
RefreshToken.belongsTo(User, { foreignKey: 'user_id' })

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'user_id',
  otherKey: 'role_id'
})

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: 'role_id',
  otherKey: 'user_id'
})

Book.hasMany(BorrowBook, { foreignKey: 'book_id' })
BorrowBook.belongsTo(Book, { foreignKey: 'book_id' })

User.hasMany(BorrowBook, { foreignKey: 'user_id' })
BorrowBook.belongsTo(User, { foreignKey: 'user_id' })

const models = {
  User,
  RefreshToken,
  Permission,
  Role,
  RolePermission,
  UserRole,
  Book,
  BorrowBook
}

module.exports = models
