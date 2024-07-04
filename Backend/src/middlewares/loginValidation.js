const {body} = require('express-validator');

const loginValidator = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').trim().notEmpty().withMessage('Password is required')
]

module.exports = loginValidator;