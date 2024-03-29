const { sequelizeCon } = require('../configs/')
const { User, Permission, RefreshToken, Role, RolePermission, UserRole } =
  require('./models')
const Book = require('./models/book')
const BorrowBook = require('./models/borrowBook')
const seedDatabase = require('./seeder/seeder')

/**
 * Sets up the database connection and synchronizes Sequelize models.
 * @return {Promise<void>} A promise that resolves when the setup is complete.
 */
async function setupDatabase () {
  try {
    console.log('===================== START PROCESS SETUP DATABASE =====================')
    // Authenticate with the database
    await sequelizeCon.authenticate()
    const isUserTableExists = await tableExists('users')

    if (!isUserTableExists) {
      // create table if not exists
      await User.sync()
      await Role.sync()
      await Permission.sync()
      await UserRole.sync()
      await RolePermission.sync()

      await RefreshToken.sync()
      await Book.sync()
      await BorrowBook.sync()
    }
    console.log('Connection has been established successfully.')

    // Synchronize Sequelize models with the database
    await sequelizeCon.sync()
    console.log('Models synchronized with the database.')
    const checkIsEmpty = await User.count()
    if (checkIsEmpty === 0) {
      await seedDatabase()
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    throw error // Re-throw the error to handle it elsewhere if needed
  } finally {
    console.log('===================== FINISH PROCESS SETUP DATABASE =====================')
  }
}

async function tableExists (tableName) {
  try {
    const [result] = await sequelizeCon.query(
      `SELECT table_name FROM information_schema.tables WHERE table_name = '${tableName}' LIMIT 1;`
    )

    return result.length > 0
  } catch (error) {
    console.error('Error checking table existence:', error)
    return false
  }
}

module.exports = setupDatabase
