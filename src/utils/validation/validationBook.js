const { body } = require('express-validator')

const borrowBookValidationRules = () => {
  return [
    // Validate email
    body('book_id')
      .notEmpty().withMessage('Book id is required')
      .trim().escape()
  ]
}

module.exports = {
  borrowBookValidationRules
}
