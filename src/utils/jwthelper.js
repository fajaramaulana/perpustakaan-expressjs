const jwt = require('jsonwebtoken')

const generateJWT = (user) => {
  const payload = {
    id: user.user_id,
    email: user.email,
    username: user.username,
    role: user.role
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
  return token
}

module.exports = {
  generateJWT
}
