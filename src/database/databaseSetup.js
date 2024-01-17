const { sequelizeCon } = require('../configs/')
const { User, Permission, RefreshToken, Role, RolePermission, UserRole } =
  require('./models')
const Book = require('./models/book')
const BorrowBook = require('./models/borrowBook')

/**
 * Sets up the database connection and synchronizes Sequelize models.
 * @return {Promise<void>} A promise that resolves when the setup is complete.
 */
async function setupDatabase () {
  try {
    // Authenticate with the database
    await sequelizeCon.authenticate()

    console.log('==============')
    // check if table exists

    await User.sync()
    await Role.sync()
    await Permission.sync()
    await UserRole.sync()
    await RolePermission.sync()

    await RefreshToken.sync()
    await Book.sync()
    await BorrowBook.sync()
    console.log('Connection has been established successfully.')

    // Synchronize Sequelize models with the database
    await sequelizeCon.sync()
    console.log('Models synchronized with the database.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    throw error // Re-throw the error to handle it elsewhere if needed
  }
}

module.exports = setupDatabase
