const { v4: UUIDV4 } = require('uuid')

const Role = require('../models/role')
const { User, UserRole, Permission, RolePermission, Book } = require('../models')
const { hashPassword } = require('../../utils/authHelper')

const isTableRoleEmpty = async () => {
  try {
    const countRole = await Role.count()
    return countRole === 0
  } catch (error) {
    console.log(`'Error checking if the table Role is empty: ${error}`)
    return false
  }
}

const isTableUserEmpty = async () => {
  try {
    const countUser = await User.count()
    return countUser === 0
  } catch (error) {
    console.log(`'Error checking if the table User is empty: ${error}`)
    return false
  }
}

const isTableUserRolesEmpty = async () => {
  try {
    const countUserRoles = await UserRole.count()
    return countUserRoles === 0
  } catch (error) {
    console.log(`'Error checking if the table UserRole is empty: ${error}`)
    return false
  }
}

const isTablePermissionEmpty = async () => {
  try {
    const countPermission = await Permission.count()
    return countPermission === 0
  } catch (error) {
    console.log(`'Error checking if the table Permission is empty: ${error}`)
    return false
  }
}

const isTableRolePermissionEmpty = async () => {
  try {
    const countRolePermission = await RolePermission.count()
    return countRolePermission === 0
  } catch (error) {
    console.log(`'Error checking if the table RolePermission is empty: ${error}`)
    return false
  }
}

const isTableBooksEmpty = async () => {
  try {
    const countBooks = await Book.count()
    return countBooks === 0
  } catch (error) {
    console.log(`'Error checking if the table Books is empty: ${error}`)
    return false
  }
}

const seedDatabase = async () => {
  try {
    console.log('===================== START SEEDING DATABASE =====================')
    const tableRoleEmpty = await isTableRoleEmpty()
    const uuidAdminRole = UUIDV4()
    const uuidUserRole = UUIDV4()
    const uuidAdminId = UUIDV4()
    const uuidUserId = UUIDV4()

    if (tableRoleEmpty) {
      await Role.bulkCreate([
        {
          role_id: uuidAdminRole,
          name: 'admin',
          updatedBy: 1
        },
        {
          role_id: uuidUserRole,
          name: 'user',
          updatedBy: 1
        }
      ])
      console.log('Table Role seeded successfully')
    }

    const tableUserEmpty = await isTableUserEmpty()

    if (tableUserEmpty) {
      try {
        const adminPassword = await hashPassword('admin123')
        const usersPassword = await hashPassword('user123')
        await User.bulkCreate([
          {
            user_id: uuidAdminId,
            name: 'Super Admin',
            username: 'superadmin',
            email: 'superadmin@gmail.com',
            password: adminPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: 1
          },
          {
            user_id: uuidUserId,
            name: 'User',
            username: 'user',
            email: 'user1@gmail.com',
            password: usersPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: 1
          }
        ])
      } catch (error) {
        console.error('Error during bulkCreate:', error)
      }
    }

    const tableUserRolesEmpty = await isTableUserRolesEmpty()
    if (tableUserRolesEmpty) {
      await UserRole.bulkCreate([
        {
          id: UUIDV4(),
          role_id: uuidAdminRole,
          user_id: uuidAdminId,
          updatedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          id: UUIDV4(),
          role_id: uuidUserRole,
          user_id: uuidUserId,
          updatedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])

      console.log('Table User Roles seeded successfully')
    }
    const tablePermissionEmpty = await isTablePermissionEmpty()
    const uuidCreateBookPermission = UUIDV4()
    const uuidReadBookPermission = UUIDV4()
    const uuidUpdateBookPermission = UUIDV4()
    const uuidDeleteBookPermission = UUIDV4()

    const uuidCreateRolePermission = UUIDV4()
    const uuidReadRolePermission = UUIDV4()
    const uuidUpdateRolePermission = UUIDV4()
    const uuidDeleteRolePermission = UUIDV4()

    const uuidReadDashboardPermission = UUIDV4()

    const readUserPermission = UUIDV4()
    const updateUserPermission = UUIDV4()
    const deleteUserPermission = UUIDV4()
    const createUserPermission = UUIDV4()

    const uuidCreateBorrowPermission = UUIDV4()
    const uuidReadBorrowPermission = UUIDV4()
    const uuidUpdateBorrowPermission = UUIDV4()
    const uuidDeleteBorrowPermission = UUIDV4()

    const uuidReadBorrowHistoryPermission = UUIDV4()
    if (tablePermissionEmpty) {
      await Permission.bulkCreate([
        {
          id: uuidCreateBookPermission,
          name: 'create-book',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidReadBookPermission,
          name: 'read-book',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidUpdateBookPermission,
          name: 'update-book',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidDeleteBookPermission,
          name: 'delete-book',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidCreateRolePermission,
          name: 'create-role',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidReadRolePermission,
          name: 'read-role',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidUpdateRolePermission,
          name: 'update-role',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidDeleteRolePermission,
          name: 'delete-role',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidReadDashboardPermission,
          name: 'read-dashboard',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: readUserPermission,
          name: 'read-user',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: updateUserPermission,
          name: 'update-user',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: deleteUserPermission,
          name: 'delete-user',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: createUserPermission,
          name: 'create-user',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidCreateBorrowPermission,
          name: 'create-borrow',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidReadBorrowPermission,
          name: 'read-borrow',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidUpdateBorrowPermission,
          name: 'update-borrow',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidDeleteBorrowPermission,
          name: 'delete-borrow',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        },
        {
          id: uuidReadBorrowHistoryPermission,
          name: 'read-borrow-history',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1
        }
      ])

      console.log('Table Permission seeded successfully')
    }

    const tableRolePermissionEmpty = await isTableRolePermissionEmpty()
    if (tableRolePermissionEmpty) {
      await RolePermission.bulkCreate([
        {
          id: UUIDV4(),
          role_id: uuidAdminRole,
          permission_id: uuidCreateBookPermission,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: UUIDV4(),
          role_id: uuidAdminRole,
          permission_id: uuidReadBookPermission,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: UUIDV4(),
          role_id: uuidAdminRole,
          permission_id: uuidUpdateBookPermission,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: UUIDV4(),
          role_id: uuidAdminRole,
          permission_id: uuidDeleteBookPermission,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: UUIDV4(),
          role_id: uuidAdminRole,
          permission_id: uuidCreateRolePermission,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: UUIDV4(),
          role_id: uuidAdminRole,
          permission_id: uuidReadRolePermission,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: UUIDV4(),
          role_id: uuidAdminRole,
          permission_id: uuidUpdateRolePermission,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: UUIDV4(),
          role_id: uuidAdminRole,
          permission_id: uuidDeleteRolePermission,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: UUIDV4(),
          role_id: uuidUserRole,
          permission_id: uuidReadBookPermission,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: UUIDV4(),
          role_id: uuidUserRole,
          permission_id: uuidReadDashboardPermission,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: UUIDV4(),
          role_id: uuidUserRole,
          permission_id: readUserPermission,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
      console.log('Table Role Permission seeded successfully')
    }

    const tableBooksEmpty = await isTableBooksEmpty()
    if (tableBooksEmpty) {
      await Book.bulkCreate([
        {
          book_id: UUIDV4(),
          title: 'The Lord of the Rings',
          author: 'J.R.R. Tolkien',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
          createdBy: 1
        },
        {
          book_id: UUIDV4(),
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
          createdBy: 1
        },
        {
          book_id: UUIDV4(),
          title: 'Harry Potter and the Philosopher\'s Stone',
          author: 'J.K. Rowling',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
          createdBy: 1
        }
      ])
      console.log('Table Books seeded successfully')
    }
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    console.log('===================== END SEEDING DATABASE =====================')
  }
}

module.exports = seedDatabase
