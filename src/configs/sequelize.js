const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')

dotenv.config()

const sequelizeCon = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    // logging: true,
    logging: (msg) => console.log(msg)
  }
)

module.exports = sequelizeCon
