const { hashPassword } = require('../utils/authHelper')
const { User, Role, UserRole } = require('../database/models')
const sequelizeCon = require('../configs/sequelize')

const registerUserService = async (userData) => {
  let transaction
  try {
    // start transaction
    // check if email already exist
    const checkEmail = await User.findOne({
      where: {
        email: userData.email
      },
      attributes: ['email']
    })

    if (checkEmail) {
      throw new Error('Email already exist')
    }

    // check if username already exist
    const checkUsername = await User.findOne({
      where: {
        username: userData.username
      },
      attributes: ['username']
    })

    if (checkUsername) {
      throw new Error('Username already exist')
    }
    transaction = await sequelizeCon.transaction()
    const insertedData = {
      name: userData.name,
      email: userData.email,
      username: userData.username,
      password: await hashPassword(userData.password),
      createdAt: new Date(),
      updatedBy: 0
    }

    // insert to database
    const user = await User.create(insertedData)

    const getIdRoleUser = await Role.findOne({
      where: {
        name: 'user'
      },
      attributes: ['role_id']
    })

    const userRole = {
      role_id: getIdRoleUser.role_id,
      user_id: user.user_id,
      updatedBy: 0
    }

    await UserRole.create(userRole)

    // Commit the transaction
    await transaction.commit()

    return user
  } catch (error) {
    // Rollback the transaction if an error occurs
    if (transaction) {
      await transaction.rollback()
    }
    console.log(`error on registerUser service: ${error}`)
    throw new Error(error.message)
  }
}

module.exports = {
  registerUserService
}
